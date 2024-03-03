import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as datamappers from "../models/index.datamapper.js";

export default {
    async signup(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        try {
            if (!name || !email || !password || !confirmPassword) {
                throw new Error("Missing values", { cause: { code: 400 } });
            }

            // email verification
            if (!EmailValidator.validate(email)) {
                throw new Error("Invalid email", { cause: { code: 400 } });
            }

            // check if passwords match
            if (password !== confirmPassword) {
                throw new Error(
                    "Password and confirm password are not the same",
                    { cause: { code: 400 } }
                );
            }

            const existEmail = await datamappers.userDatamapper.findOne(
                "email",
                email
            );
            if (existEmail) {
                throw new Error("An error has occurred", {
                    cause: { code: 404 },
                });
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const encryptedPass = await bcrypt.hash(password, salt);

            const createUser = await datamappers.userDatamapper.create({
                name,
                email,
                password: encryptedPass,
                is_admin: false,
            });

            return res.status(201).json(createUser);
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }

            return res
                .status(500)
                .json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async signin(req, res) {
        const { email, password } = req.body;

        try {
            // email verification
            if (!EmailValidator.validate(email)) {
                throw new Error("Invalid email", { cause: { code: 400 } });
            }

            // check if user exists
            const existUser = await datamappers.userDatamapper.findOne(
                "email",
                email
            );
            if (!existUser) {
                throw new Error("Incorrect email or password", {
                    cause: { code: 400 },
                });
            }

            // check if password matches database password
            const passOk = await bcrypt.compare(password, existUser.password);
            if (!passOk) {
                throw new Error("Incorrect email or password", {
                    cause: { code: 400 },
                });
            }

            // user data
            const user = {
                userId: existUser.id,
                username: existUser.username,
            };

            // creation of the token
            const token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            return res.json({ token });
        } catch (err) {
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res
                .status(500)
                .json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async test(req, res) {
        const result = await datamappers.userDatamapper.findAll();

        return res.status(200).json(result);
    },
};

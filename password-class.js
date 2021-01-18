"use strict";

class PasswordGenator {
    constructor(lengthPW = 12, lower = true, upper = true, numeric = true, special = true) {
        this.selectedTypes = {
            lower: lower,
            upper: upper,
            numeric: numeric,
            special: special,
        };

        this.passwordEnum = {
            NUMERIC: "numeric",
            LOWER: "lower",
            UPPER: "upper",
            SPECIAL: "special",
            RANDOM: "random",
        };

        this.lengthPW = lengthPW;
    }

    generatePassword() {
        if (
            this.selectedTypes.lower ||
            this.selectedTypes.upper ||
            this.selectedTypes.numeric ||
            this.selectedTypes.special
        ) {
            let resultPassword = [];

            for (let i = 0; i < this.lengthPW; i++) {
                resultPassword.push(null);
            }

            let numeric = this.selectedTypes.numeric;
            let lower = this.selectedTypes.lower;
            let upper = this.selectedTypes.upper;
            let special = this.selectedTypes.special;
            let type = null;

            for (let i = 0; i < this.lengthPW; i++) {
                if (numeric) {
                    type = this.passwordEnum.NUMERIC;
                    numeric = false;
                } else if (lower) {
                    type = this.passwordEnum.LOWER;
                    lower = false;
                } else if (upper) {
                    type = this.passwordEnum.UPPER;
                    upper = false;
                } else if (special) {
                    type = this.passwordEnum.SPECIAL;
                    special = false;
                } else {
                    type = this.passwordEnum.RANDOM;
                }

                resultPassword[
                    this.findRandomNonUsedPosition(resultPassword)
                ] = this.getRandomSymbol(type);
            }

            this.resultPassword = resultPassword.join("");
            return this.resultPassword;
        } else {
            this.error = "At least one type of symbol needed.";
        }
    }

    getRandomSymbol(type) {
        let numeric = "1234567890";
        let lowerAlphabet = "abcdefghijklmopqrstuvwxyz";
        let upperAlphabet = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
        let specialChars = "!{}=$%&#+*<>";

        let symbol = "";

        switch (type) {
            case this.passwordEnum.NUMERIC: {
                symbol = numeric[this.getRandomNumber(numeric.length - 1)];
                break;
            }

            case this.passwordEnum.LOWER: {
                symbol =
                    lowerAlphabet[
                        this.getRandomNumber(lowerAlphabet.length - 1)
                    ];
                break;
            }

            case this.passwordEnum.UPPER: {
                symbol =
                    upperAlphabet[
                        this.getRandomNumber(upperAlphabet.length - 1)
                    ];
                break;
            }

            case this.passwordEnum.SPECIAL: {
                symbol =
                    specialChars[
                        this.getRandomNumber(specialChars.length - 1)
                    ];
                break;
            }

            default: {
                let base = "";

                if (this.selectedTypes.numeric) {
                    base += numeric;
                }

                if (this.selectedTypes.lower) {
                    base += lowerAlphabet;
                }

                if (this.selectedTypes.upper) {
                    base += upperAlphabet;
                }

                if (this.selectedTypes.special) {
                    base += specialChars;
                }

                symbol = base[this.getRandomNumber(base.length - 1)];
                break;
            }
        }

        return symbol;
    }

    getRandomNumber(max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    findRandomNonUsedPosition(password) {
        let randomPosition = this.getRandomNumber(this.lengthPW - 1);

        if (
            password[randomPosition] != null ||
            typeof password[randomPosition] == "undefined"
        ) {
            randomPosition = this.findRandomNonUsedPosition(password);
        }
        return randomPosition;
    }
}
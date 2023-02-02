import { findUserByUsername } from "../repositories/userRepository";
import { BaseUser } from "../types";

export const adjustUsername = async (user: BaseUser) => {
    let oldUserSameUsername = await findUserByUsername(user.username);
        
        if (oldUserSameUsername && oldUserSameUsername.email !== user.email) {
            while (oldUserSameUsername) {
                user.username +=
                    String(
                        Math.floor(
                            Math.random() * (100000 - 111) + 111
                        )
                    );
                oldUserSameUsername = await findUserByUsername(user.username);
            }
        }
};

export const findDuplicates = (arr: string[]) => {
	return arr.filter((item, index) => arr.indexOf(item) !== index);
};

export const checkIfDuplicatesExist = (arr: string[]) => {
	return new Set(arr).size !== arr.length;
};

//might fail when offfset back by local if not same timezone as front
export const getAge = (dateString: string): number => {
	const today = new Date();
	const birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

export const assertNever = (value: string): never => {
	throw new Error(`Unhandled discriminated union member: ${value}`);
};

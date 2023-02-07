import pool from '../db';
import { getString, getDate } from '../dbUtils';
import { AuthState } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stateMapper = (row: any): AuthState => {
	return {
		state: getString(row['state']),
		createdAt: getDate(row['created_at'])
	};
};

const addState = async (): Promise<AuthState> => {
	const query = {
		text: 'INSERT INTO states_expire_table DEFAULT VALUES returning *',
		values: []
	};

	const res = await pool.query(query);
	return stateMapper(res.rows[0]);
};

const isAuthState = async (state: string): Promise<boolean> => {
	const selectQuery = {
		text: 'select * from states_expire_table where state = $1',
		values: [state]
	};

	const res = await pool.query(selectQuery);

	const deleteQuery = {
		text: 'delete from states_expire_table where state = $1',
		values: [state]
	};

	await pool.query(deleteQuery);

	if (!res.rowCount) {
		return false;
	}
	return true;
};

export { addState, isAuthState };

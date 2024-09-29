export async function tryCatchHelper<P>(fn: () => Promise<P>) {
	try {
		return await fn();
	} catch (error) {
		throw new Error(error as string).message;
	}
}

import { ApolloError as InternalApolloError } from "@apollo/client";

const ApolloError = ({ error }: { error: InternalApolloError }) => {
	return (
		<div role='alert'>
			{!!error.name?.length ? <h3>{error.name}</h3> : "Error"}
			<hr />
			{!!error.message?.length && <p>{error.message}</p>}
			{!!error.stack?.length && <pre>{error.stack}</pre>}
		</div>
	);
};

export { ApolloError };

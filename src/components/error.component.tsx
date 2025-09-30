import { ApolloError } from "@apollo/client";

const ApolloErrorDisplay = ({ error }: { error: ApolloError }) => {
	return (
		<div role='alert'>
			{!!error.name?.length ? <h3>{error.name}</h3> : "Error"}
			<hr />
			{!!error.message?.length && <p>{error.message}</p>}
			{!!error.stack?.length && <pre>{error.stack}</pre>}
		</div>
	);
};

export { ApolloErrorDisplay };

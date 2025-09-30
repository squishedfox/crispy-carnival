import { ApolloError } from "@apollo/client";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ApolloErrorDisplay } from "./error.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Errors",
	component: ApolloErrorDisplay,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["errors"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		error: {
			control: "object",
			description: "The raw response back form the graph QL react hook",
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {},
} satisfies Meta<typeof ApolloErrorDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicError: ApolloError = {
	name: "BasicError",
	message: "An unexpected error occured",
	graphQLErrors: [],
	protocolErrors: [],
	clientErrors: [],
	networkError: null,
	cause: null,
	extraInfo: undefined,
};
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		error: basicError,
	},
};

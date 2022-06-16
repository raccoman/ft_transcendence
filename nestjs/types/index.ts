export interface HasuraActionsPayload<Input extends {} = {}, Session extends {} = {}> {
	action: {
	  name: string;
	};
	input: Input;
	session_variables: Session;
}
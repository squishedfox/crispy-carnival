import React, { useState } from "react";

const CreateFormPage = () => {
	const [form, updateForm] = useState({
		name: "",
		active: false,
	});
	return (
		<div>
			<form>
				<fieldset>
					<legend>New Form Template</legend>
					<div>
						<label
							aria-description='User friendly name for the form'
							htmlFor='form-name-input'
						>
							Name
						</label>
						<div>
							<input
								name='form-name-input'
								type='text'
								value={form.name}
								required
							/>
						</div>
					</div>
					<div>
						<label
							aria-description='Whether the form is active and can be used'
							htmlFor='form-name-input'
						>
							Active
						</label>
						<div>
							<input
								name='form-active-checkbox'
								type='checkbox'
								checked={form.active}
							/>
						</div>
					</div>
				</fieldset>
			</form>
		</div>
	);
};

export default CreateFormPage;

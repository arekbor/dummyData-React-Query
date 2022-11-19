import { FC } from "react";
import { useMutation, UseMutationResult } from "react-query";
import { api } from "../api/api";
import { DummyDataCreate } from "../interfaces/DummyDataCreate";
import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";

const fetchCreateDummyData = async (
	data: DummyDataCreate
): Promise<DummyDataCreate> => {
	const res = await api({
		url: "/api/dummy/data",
		method: "post",
		data: data,
	});
	if (res.status === 201) {
		return res.data;
	}
	throw new Error("error create dummy data");
};

const DummyDataCreateView: FC = () => {
	const mutation: UseMutationResult<
		DummyDataCreate,
		AxiosError<string>,
		DummyDataCreate
	> = useMutation(async (dummyData) => fetchCreateDummyData(dummyData));

	const { handleSubmit, register } = useForm<DummyDataCreate>();

	const onSubmit: SubmitHandler<DummyDataCreate> = (data) => {
		mutation.mutate(data);
	};

	return (
		<>
			{mutation.isLoading ? (
				<p>Adding...</p>
			) : (
				<>
					{mutation.isError ? (
						<div>{mutation?.error?.response?.data}</div>
					) : null}

					{mutation.isSuccess ? (
						<div>
							dummy data added data: {mutation?.data.version}
						</div>
					) : null}
					{""}
				</>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<br />
				<input
					{...register("data")}
					placeholder="data"
					type="text"
					maxLength={25}
					required
				/>
				<br />
				<br />
				<input
					{...register("version")}
					placeholder="version"
					type="text"
					maxLength={15}
					required
				/>
				<br />
				<br />
				<input
					{...register("count", { valueAsNumber: true })}
					placeholder="count"
					type="number"
				/>
				<br />
				<br />
				<input type="submit" />
			</form>
		</>
	);
};

export default DummyDataCreateView;

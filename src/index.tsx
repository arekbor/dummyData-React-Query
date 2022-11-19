import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DummyDataView from "./views/DummyData.page";
import DummyDataCreate from "./views/DummyDataCreate.page";
import DummyDataId from "./views/DummyDataId.page";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const reactQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			notifyOnChangeProps: "tracked",
			retry: false,
		},
	},
});

root.render(
	<React.StrictMode>
		<QueryClientProvider client={reactQueryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<BrowserRouter>
				<Routes>
					<Route
						path="/dummyData"
						element={<DummyDataView />}
					/>
					<Route
						path="/dummyData/:id"
						element={<DummyDataId />}
					/>
					<Route
						path="/dummyData/create"
						element={<DummyDataCreate />}
					/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);

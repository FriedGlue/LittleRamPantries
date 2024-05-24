import { useRouteError } from "react-router-dom";
import { RouteError } from "../types/types";

export default function ErrorPage() {
  const error = useRouteError() as RouteError | null;
  console.error(error);

  let errorMessage = 'An unexpected error has occurred.';
  let statusCodeMessage = '';

  if (error) {
    errorMessage = error.statusText || error.message || errorMessage;
    statusCodeMessage = error.status? `Error Code: ${error.status}` : '';
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[750px] w-full'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {<p><i>{statusCodeMessage}: {errorMessage}</i></p>}
    </div>
  );
}


import { useValues } from "./ValueProvider";

export default function Protected({children}) {
    const{user,} = useValues();
  return (user && user.name && user.email) ? <>{children}</> : <></>
}

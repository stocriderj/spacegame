import {Link} from "../components/Links";

export default function HomePage() {
  return (
    <div className="container">
      <div>
        <h1>IRIUM</h1>
        <p>in development</p>
      </div>

      <div>
        <Link to="/register">Log in or register</Link>
      </div>
    </div>
  );
}

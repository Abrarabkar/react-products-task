import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Welcome to my React project structure.</p>
      <Button onClick={() => alert("Hello!")}>Click me</Button>
      <EmptyState />
    </main>
  );
}

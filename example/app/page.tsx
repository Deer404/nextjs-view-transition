import styles from "./page.module.css";
import { TransitionLink } from "nextjs-view-transition";
export default function Home() {
  return (
    <main className={styles.main}>
      <span>Transition Test</span>
      <TransitionLink href="/book">Go to Book Page</TransitionLink>
    </main>
  );
}

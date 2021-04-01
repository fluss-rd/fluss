import MyFragment from "fragments/Another/MyFragment";
import styles from "styles/pages/another.module.scss";
import css from "styles/pages/another2.module.css";

// Here are examples of how to consume components and external styles.
// For TypeScript support for your style definitions you need to
// run `npm run sass-types` and `npm run css-types`
// See point 3 in "Use CSS and SASS in the project" section in the
// README.md file.
export default function Another() {
  return (
    <div className={css["hey-another"]}>
      <div className={styles.myStyle}>
        Hola
      </div>
      <MyFragment />
    </div>
  );
}

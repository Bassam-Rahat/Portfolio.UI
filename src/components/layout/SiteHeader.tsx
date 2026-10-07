import { navigation, profile } from "@/content/profile";
import { Brand } from "./Brand";
import { NavLinks } from "./NavLinks";
import { ThemeSwitch } from "./ThemeSwitch";
import styles from "./SiteHeader.module.css";

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function SiteHeader() {
  return (
    <header className={`${styles.header} no-print`}>
      <div className="container">
        <div className={styles.bar}>
          <Brand name={profile.name} role={profile.role} initials={initials} />
          <nav aria-label="Main" className={styles.nav}>
            <NavLinks items={navigation} resumePath={profile.resumePath} />
          </nav>
          <div className={styles.theme}>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}

import styles from "../../styles/redirect.module.scss";

const RedirectComponent = () => {
  const ssoUri = process.env.REACT_APP_CLOUDFRONT_SSO;

  return (
    <div className={styles["redirect"]}>
      <h1>Please log in to access LEI Productivity Tools Portal</h1>
      <h3>Contact bsllabs-automations@lseg.com if issue persists</h3>

      <a href={`${ssoUri}`}>Click here to authenticate with SSO</a>
    </div>
  );
};

export default RedirectComponent;

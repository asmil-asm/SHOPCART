import Inputs from "@components/forms/Inputs";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vaildationLogin, type stateLogin } from "@vaildation/validationLogin";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "@store/actions/LoginAction";
import { useTranslation } from "react-i18next";
import PageTransition from "@components/feedback/Animation/PageTransition";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.login);
  const { t } = useTranslation();

  const method = useForm<stateLogin>({
    resolver: zodResolver(vaildationLogin),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<stateLogin> = async (data) => {
    const result = await dispatch(LoginAction(data));
    if (LoginAction.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <PageTransition>
    <div className="login">
      <h1>{t("auth.login")}</h1>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(submitForm)}>
          <Inputs type="email" name="email" title={t("auth.email")} />
          <Inputs type="password" name="password" title={t("auth.password")} />
          <button>{t("auth.login")}</button>
        </form>
        <div className="content">
          <button className="btns" onClick={() => navigate("/register")}>
            {t("auth.signUp")}
          </button>
          <button className="btns" onClick={() => navigate(-1)}>
            ← {t("auth.back")}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </FormProvider>
    </div>
    </PageTransition>
  );
};

export default Login;
import { zodResolver } from "@hookform/resolvers/zod";
import { validationContact, type stateContact } from "@vaildation/vaildationContact";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ContactAction } from "@store/actions/ContactActions";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { useTranslation } from "react-i18next";
import PageTransition from "@components/feedback/Animation/PageTransition";
import './Contact.css';

const Contact = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<stateContact>({
    resolver: zodResolver(validationContact),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const submit: SubmitHandler<stateContact> = async (data) => {
    await dispatch(ContactAction(data))
      .unwrap()
      .then(() => {
        reset();
      })
      .catch((err) => {
        console.error("Failed to send message:", err);
      });
  };

  const { loading } = useAppSelector((state) => state.contact);

  return (
    <PageTransition>
    <div className="contact">
      <section className="data">
        <div className="info">
          <div>
            <h2>{t('contact.title')}</h2>
            <p className="title">{t('contact.subtitle')}</p>

            <div className="contecting">
              <p>
                <strong>{t('contact.email')}:</strong> support@shopcart
              </p>
              <p>
                <strong>{t('contact.phone')}:</strong> +44 123 456 789
              </p>
              <p>
                <strong>{t('contact.address')}:</strong> London, United Kingdom
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-4">
              <label>{t('contact.name')}</label>
              {errors.name && <p className="error">{errors.name.message}</p>}
              <input type="text" {...register('name')} />
            </div>

            <div>
              <label>{t('contact.email')}</label>
              {errors.email && <p className="error">{errors.email.message}</p>}
              <input type="email" {...register('email')} />
            </div>

            <div>
              <label>{t('contact.message')}</label>
              {errors.message && <p className="error">{errors.message.message}</p>}
              <textarea {...register('message')} rows={5}></textarea>
            </div>

            <button type="submit">
              {loading === 'pending' ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </section>
    </div>
    </PageTransition>
  );
};

export default Contact;
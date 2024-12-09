import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-[1140px] flex-col gap-12 pb-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 place-items-center gap-8 *:max-w-40 sm:grid-cols-3">
          <img src="/urataidot/eu_rahoittama_logo.png" alt="Euroopan unionin rahoittama" />
          <img src="/urataidot/hyria_logo.png" alt="Hyria" className="px-4" />
        </div>
        <p className="px-4 sm:text-end">
          &copy; {'Hyria ' + new Date().getFullYear() + '. ' + t('common.all-rights-reserved')}{' '}
        </p>
      </div>
    </footer>
  );
};

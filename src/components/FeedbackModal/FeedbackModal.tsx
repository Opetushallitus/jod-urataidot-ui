import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, InputField, Modal, RadioButton, RadioButtonGroup, Textarea } from '@jod/design-system';
import React from 'react';
import { Form, FormProvider, FormSubmitHandler, useForm, useFormState } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { z } from 'zod';
import { FormError } from '../FormError/FormError';

interface PalauteForm {
  osio: string;
  aihe: string;
  palaute: string;
  ottakaaYhteytta?: boolean;
  sposti?: string;
}

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const formId = React.useId();
  const [feedbackOsio, setFeedbackOsio] = React.useState<string>('');
  const [feedbackAihe, setFeedbackAihe] = React.useState<string>('');

  const methods = useForm<PalauteForm>({
    mode: 'onBlur',
    resolver: zodResolver(
      z
        .object({
          osio: z.string().min(1, t('feedback.errors.osio')),
          aihe: z.string().min(1, t('feedback.errors.aihe')),
          palaute: z.string().min(1, t('feedback.errors.palaute')),
          ottakaaYhteytta: z.boolean().optional().default(false),
          sposti: z
            .union([
              z.string().length(0, t('feedback.errors.valid-sposti')),
              // eslint-disable-next-line sonarjs/deprecation
              z.string().email(t('feedback.errors.valid-sposti')),
            ])
            .optional(),
        })
        .refine(
          // eslint-disable-next-line sonarjs/function-return-type
          (data) => {
            if (data.ottakaaYhteytta) {
              return data.sposti && data.sposti.trim().length > 0;
            }
            return true;
          },
          {
            message: t('feedback.errors.required-sposti'),
            path: ['sposti'],
          },
        ),
    ),
    defaultValues: {
      osio: '',
      aihe: '',
      palaute: '',
      ottakaaYhteytta: false,
      sposti: '',
    },
  });

  const { isValid, isLoading, errors } = useFormState({
    control: methods.control,
  });

  const onSubmit: FormSubmitHandler<PalauteForm> = async ({ data: _data }) => {
    // send feedback actually to somewhere
    onClose();
  };

  const { watch, setValue, trigger } = methods;
  const ottakaaYhteytta = watch('ottakaaYhteytta');

  React.useEffect(() => {
    void trigger();
  }, [trigger]);

  if (isLoading) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      fullWidthContent
      content={
        <FormProvider {...methods}>
          <Form
            id={formId}
            onSubmit={onSubmit}
            onKeyDown={(event) => {
              const target = event.target as HTMLElement;
              const tagName = target.tagName.toLowerCase();
              // Allow hyperlink to be navigated with the keyboard
              if (tagName === 'a') {
                return;
              }
              // Prevent form submission on Enter
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          >
            <h2 className="text-hero-mobile sm:text-hero mb-4 text-black sm:mb-5">{t('feedback.title')}</h2>
            <div className="text-body-md-mobile sm:text-body-md font-arial mb-5 flex flex-col gap-5">
              <p>{t('feedback.description')}</p>
              <div>
                <p>{t('feedback.description-2')}</p>

                <ol className="list-inside list-decimal">
                  <li>{t('feedback.questions.item-1')}</li>
                  <li>{t('feedback.questions.item-2')}</li>
                  <li>{t('feedback.questions.item-3')}</li>
                </ol>
              </div>
              <p>{t('feedback.privacy')}</p>
            </div>

            <div>
              <RadioButtonGroup
                label={t('feedback.osio.title')}
                value={feedbackOsio}
                onChange={(newValue) => {
                  setFeedbackOsio(newValue);
                  methods.setValue('osio', newValue, { shouldValidate: true });
                }}
              >
                <RadioButton {...methods.register('osio')} label={t('feedback.osio.options.option-1')} value="a" />
                <RadioButton {...methods.register('osio')} label={t('feedback.osio.options.option-2')} value="b" />
                <RadioButton {...methods.register('osio')} label={t('feedback.osio.options.option-3')} value="c" />
                <RadioButton {...methods.register('osio')} label={t('feedback.osio.options.option-4')} value="d" />
              </RadioButtonGroup>
              <FormError name="osio" errors={errors} />
            </div>

            <div>
              <RadioButtonGroup
                className="mt-5 mb-5"
                label={t('feedback.aihe.title')}
                value={feedbackAihe}
                onChange={(newValue) => {
                  setFeedbackAihe(newValue);
                  methods.setValue('aihe', newValue, { shouldValidate: true });
                }}
              >
                <RadioButton {...methods.register('aihe')} label={t('feedback.aihe.options.option-1')} value="a" />
                <RadioButton {...methods.register('aihe')} label={t('feedback.aihe.options.option-2')} value="b" />
                <RadioButton {...methods.register('aihe')} label={t('feedback.aihe.options.option-1')} value="c" />
                <RadioButton {...methods.register('aihe')} label={t('feedback.aihe.options.option-4')} value="d" />
              </RadioButtonGroup>
              <FormError name="aihe" errors={errors} />
            </div>

            <Textarea
              label={'Palaute'}
              {...methods.register('palaute' as const)}
              placeholder={t('feedback.placeholder')}
            />
            <FormError name="palaute" errors={errors} />
            <Checkbox
              ariaLabel={t('feedback.take-contact')}
              label={t('feedback.take-contact')}
              {...methods.register('ottakaaYhteytta')}
              className="mt-4"
              checked={ottakaaYhteytta || false}
              value={String(ottakaaYhteytta)}
              onChange={(e) => {
                setValue('ottakaaYhteytta', e.target.checked, { shouldValidate: true });

                if (!e.target.checked) {
                  setValue('sposti', '', { shouldValidate: true });
                }
              }}
            />
            {ottakaaYhteytta && (
              <div className="mt-4">
                <InputField
                  label={t('feedback.email')}
                  placeholder={t('feedback.email-placeholder')}
                  {...methods.register('sposti')}
                />
                <FormError name="sposti" errors={errors} />
              </div>
            )}

            <p className="font-arial mt-5">
              <Trans
                i18nKey="feedback.foot-note"
                components={{
                  CustomLink: (
                    <NavLink
                      type="link"
                      to={`${t('slugs.basic-information')}/${t('slugs.privacy-policy')}`}
                      lang={language}
                      key={'privacy-policy-link'}
                      className="text-button-md text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              />
            </p>
          </Form>
        </FormProvider>
      }
      footer={
        <div className="flex flex-1 justify-end gap-3">
          <Button variant="white" label={t('cancel')} onClick={onClose} className="whitespace-nowrap" />
          <Button
            form={formId}
            variant="white"
            label={t('feedback.send')}
            className="whitespace-nowrap"
            disabled={!isValid}
          />
        </div>
      }
    />
  );
};

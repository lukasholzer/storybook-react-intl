import React from 'react';
import {StoryContext, StoryGetter} from '@storybook/addons/dist/ts3.9/types';
import {addDecorator} from '@storybook/react';
import {IntlProvider} from 'react-intl';
import {useGlobals} from '@storybook/client-api';

const withReactIntl = (story: StoryGetter, context: StoryContext) => {
  const [{locale}] = useGlobals();
  const {
    parameters: {reactIntl},
  } = context;

  if (locale && reactIntl) {
    const {formats, messages} = reactIntl;
    const safeFormats = formats ? formats[locale] : undefined;
    if (messages) {
      return (
        <IntlProvider
          key={locale}
          formats={safeFormats}
          messages={messages[locale]}
          locale={locale}
          defaultLocale={context.parameters.locale}
        >
          {story(context)}
        </IntlProvider>
      );
    }
  }
  return story(context);
};

addDecorator(withReactIntl);

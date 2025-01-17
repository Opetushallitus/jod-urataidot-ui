import { JSX } from 'react/jsx-runtime';
import { Text, StyleSheet, Font } from '@react-pdf/renderer';
import { ReactElement, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import parse from 'html-react-parser';

Font.register({
  family: 'Arimo',
  fonts: [
    {
      src: '/urataidot/fonts/Arimo-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/urataidot/fonts/Arimo-Bold.ttf',
      fontWeight: 600,
    },
    {
      src: '/urataidot/fonts/Arimo-Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  body: {
    fontFamily: 'Arimo',
    fontSize: 12,
    marginBottom: 2,
  },
  bodyBold: {
    fontFamily: 'Arimo',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 2,
  },
  bodyItalic: {
    fontFamily: 'Arimo',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 2,
  },
});

export const parseDescription = (description: ReactNode) => {
  const elements = parse(renderToString(description as ReactElement));

  if (!elements) {
    return null;
  }

  if (typeof elements === 'string') {
    return <Text style={styles.body}>{elements}</Text>;
  }

  if (Array.isArray(elements)) {
    return (
      <Text>
        {elements.map((el: JSX.Element) => {
          if (el.type === 'strong') {
            return (
              <Text key={el.key} style={styles.bodyBold}>
                {el.props.children}
              </Text>
            );
          }
          if (el.type === 'i') {
            return (
              <Text key={el.key} style={styles.bodyItalic}>
                {el.props.children}
              </Text>
            );
          }

          if (el.type === 'br') {
            return <>{'\n'}</>;
          }

          return (
            <Text key={el.key} style={styles.body}>
              {el}
            </Text>
          );
        })}
      </Text>
    );
  }
};

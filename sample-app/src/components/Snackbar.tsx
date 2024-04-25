import React, { forwardRef, useState } from 'react';

import { Snackbar } from 'react-native-paper';

export type SnackbarRef = {
  show: (content: string) => void;
};

export const SnackbarMy = forwardRef<SnackbarRef, {}>(
  (_props, forwardedRef) => {
    const [content, setContent] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [key, setKey] = useState<number>(-1);

    React.useImperativeHandle(forwardedRef, () => {
      return {
        show: (_content: string) => {
          setKey(Date.now());
          setContent(_content);
          setVisible(true);
        },
      };
    });

    const handleDismiss = () => {
      setVisible(false);
    };

    return (
      <Snackbar
        key={key}
        visible={visible}
        onDismiss={handleDismiss}
        duration={1000}
        action={{
          label: 'Dismiss',
          onPress: handleDismiss,
        }}>
        {content}
      </Snackbar>
    );
  }
);

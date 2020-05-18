import {FieldConfigProperty, PanelPlugin} from '@grafana/data';
import {DemoFieldConfig, SimpleOptions} from './types';
import {SimplePanel} from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions, DemoFieldConfig>(SimplePanel)
  .setPanelOptions(builder => {
    return builder
      .addTextInput({
        path: 'text',
        name: 'Simple text option',
        description: 'Description of panel option',
        defaultValue: 'Default value of text input option',
      })
      .addBooleanSwitch({
        path: 'showSeriesCount',
        name: 'Show series counter',
        defaultValue: false,
      })
      .addRadio({
        path: 'seriesCountSize',
        defaultValue: 'sm',
        name: 'Series counter size',
        settings: {
          options: [
            {
              value: 'sm',
              label: 'Small',
            },
            {
              value: 'md',
              label: 'Medium',
            },
            {
              value: 'lg',
              label: 'Large',
            },
          ],
        },
        showIf: config => config.showSeriesCount,
      }).addRadio({
        name: 'Font face',
        path: 'fontFace',
        description: 'Choose the font face',
        settings: {
          options: [
            {
              value: 'monospace',
              label: 'Monospace'
            },
            {
              value: 'serif',
              label: 'Serif'
            },]
        },
      })
}).useFieldConfig({
    standardOptions: [FieldConfigProperty.Unit],
    useCustomConfig: builder => builder.addRadio({
      name: 'Shape',
      path: 'shape',
      settings: {
        options: [
          {value: 'triangle', label: "Triangle"},
          {value: 'circle', label: "Circle"},
          {value: 'square', label: "Square"},
        ]
      },
      defaultValue: 'square',
    })
  });

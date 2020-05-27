import { PanelPlugin, FieldConfigProperty} from '@grafana/data';
import { DemoFieldConfig, SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions, DemoFieldConfig>(SimplePanel)
  .setPanelOptions(builder => {
    builder.addRadio({
      path: 'fontFace',
      name: 'Font face',
      description: 'Choose a font face for values',
      settings: {
        options: [
          {
            value: 'sans-serif',
            label: 'Sans-serif',
          },
          {
            value: 'monospace',
            label: 'Monospace',
          },
          {
            value: 'serif',
            label: 'Serif',
          },
        ],
      },
      defaultValue: 'monospace',
    });
  })
  .useFieldConfig({
    useCustomConfig: builder => {
      builder.addRadio({
        path: 'shape',
        name: 'Shape',
        description: 'Choose a shape',
        settings: {
          options: [
            { value: 'triangle', label: 'Triangle' },
            { value: 'circle', label: 'Circle' },
            { value: 'square', label: 'Square' },
          ],
        },
        defaultValue: 'square'
      });
    },
    standardOptions: [FieldConfigProperty.Unit]
  });

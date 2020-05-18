import { PanelPlugin} from '@grafana/data';
import {DemoFieldConfig, SimpleOptions} from './types';
import {SimplePanel} from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions, DemoFieldConfig>(SimplePanel)
  // .setPanelOptions(builder => {
  //   return builder
  //     .addRadio({
  //       name: 'Font face',
  //       path: 'fontFace',
  //       description: 'Choose the font face',
  //
  //     })
// }).useFieldConfig({
//     // standardOptions: [FieldConfigProperty.Unit],
//     // useCustomConfig: builder => builder.addRadio({
//     //   name: 'Shape',
//     //   path: 'shape',
//     // })
  // });

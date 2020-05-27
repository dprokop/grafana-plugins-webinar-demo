import React from 'react';
import { DisplayValue, Field, FieldConfig, FieldType, GrafanaTheme, PanelProps } from '@grafana/data';
import { DemoFieldConfig, SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { HorizontalGroup, stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // returns shape component based on field configuration
  const getShape = (field: Field, valueIndex: number) => {
    const config = field.config as FieldConfig<DemoFieldConfig>;

    const displayValue: DisplayValue = field.display
      ? field.display(field.values.get(valueIndex))
      : {
          text: field.values.get(valueIndex),
          numeric: field.values.get(valueIndex),
          suffix: '',
        };

    return (
      <div
        className={cx(
          styles[config.custom ? config.custom.shape : 'circle'],
          css`
            font-family: ${options.fontFace || 'sans-serif'};
          `
        )}
      >
        <span>
          {displayValue.text}
          {displayValue.suffix}
        </span>
      </div>
    );
  };

  const shapes = [];

  for (const s of data.series) {
    for (const f of s.fields) {
      if (f.type == FieldType.time) {
        continue;
      }
      const fieldShapes = [];
      for (let i = 0; i < f.values.length; i++) {
        fieldShapes.push(getShape(f, i));
      }
      shapes.push(fieldShapes);
    }
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div
        className={css`
          height: ${height}px;
          overflow: hidden;
        `}
      >
        <HorizontalGroup justify='space-between' wrap>
          {shapes.map(s => (
            <HorizontalGroup>{s.map(f => f)}</HorizontalGroup>
          ))}
        </HorizontalGroup>
      </div>

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
              font-family: ${options.fontFace || 'sans-serif'};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
      </div>
    </div>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const shape = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${theme.isLight ? theme.palette.greenBase : theme.palette.blue95};
    > span {
      width: 70px;
      height: 70px;
      line-height: 70px;
      position: absolute;
      left: -35px;
      top: 50%;
      text-align: center;
    }
  `;

  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    circle: cx(
      shape,
      css`
        width: 70px;
        height: 70px;
        border-radius: 50%;
        > span {
          top: 0;
          left: 0;
        }
      `
    ),
    square: cx(
      shape,
      css`
        width: 70px;
        height: 70px;
        > span {
          top: 0;
          left: 0;
        }
      `
    ),
    triangle: cx(
      shape,
      css`
        width: 0;
        height: 0;
        background: none;
        border-left: 35px solid transparent;
        border-right: 35px solid transparent;
        border-bottom: 70px solid ${theme.isLight ? theme.palette.greenBase : theme.palette.blue95};
      `
    ),
  };
});

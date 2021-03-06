/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import React from 'react';
import { css } from '@emotion/core';
import { Flex } from '@adobe/react-spectrum';
import { AnchorButton } from '../AnchorButton';
import '@spectrum-css/typography';
import PropTypes from 'prop-types';
import { getElementChild, LARGE_SCREEN_WIDTH } from '../../utils';

const HeroButtons = ({ buttons, variants = ['cta', 'primary'], quiets = [true, true], ...props }) =>
  buttons ? (
    <Flex gap="size-200" wrap="wrap" {...props}>
      {React.Children.map(buttons.props.children, (item, i) => {
        let variant = variants[0];
        let quiet = quiets[0];

        if (i > 0) {
          variant = variants[1];
          quiet = quiets[1];
        }

        const link = getElementChild(item);

        return (
          <AnchorButton key={i} isQuiet={quiet} href={link.props.href} variant={variant}>
            {link.props.children}
          </AnchorButton>
        );
      })}
    </Flex>
  ) : null;

const HeroImage = ({ image, styles }) =>
  image
    ? React.cloneElement(image, {
        css: css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          margin-top: 0;
          ${styles}

          & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0;
          }
        `
      })
    : null;

const HeroTexts = ({ texts }) => {
  const textKeys = Object.keys(texts).filter((key) => key.startsWith('text'));
  return textKeys.map((textKey) =>
    React.cloneElement(texts[textKey], {
      className: 'spectrum-Body--L',
      css: css`
        &.spectrum-Body--L {
          margin-top: 0 !important;

          &:last-of-type {
            margin-bottom: 0 !important;
          }
        }
      `
    })
  );
};

const HeroHeading = ({ heading, variant }) =>
  heading
    ? React.cloneElement(heading, {
        className: variant === 'default' ? 'spectrum-Heading--XL' : 'spectrum-Heading--XXL spectrum-Heading--serif',
        css: css`
          margin-top: 0;
          margin-bottom: var(--spectrum-global-dimension-size-200);

          & + p {
            margin-bottom: var(--spectrum-global-dimension-size-200);
          }
        `
      })
    : null;

const Hero = ({
  background,
  theme = 'dark',
  heading,
  image,
  icon,
  buttons,
  variant = 'default',
  width = 'var(--spectrum-global-dimension-static-grid-fixed-max-width)',
  ...props
}) => {
  if (!variant || variant === 'default') {
    return (
      <section
        className={`spectrum--${theme}`}
        css={css`
          position: relative;
          height: var(--spectrum-global-dimension-size-3400);
          margin-bottom: var(--spectrum-global-dimension-size-400);
          background: ${background ?? 'rgb( 29, 125, 238)'};
          width: 100%;
          display: flex;

          @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
            overflow: auto;
            height: 100vh;
          }
        `}>
        <HeroImage image={image} styles={`position: absolute;`} />
        <div
          css={css`
            margin: auto;
            display: flex;
            position: relative;
            height: 100%;
            max-width: ${width};
            flex-direction: row;
            width: 100%;
            align-items: center;

            & > p {
              margin-top: 0 !important;
            }
          `}>
          <div
            css={css`
              width: calc(5 * 100% / 12);
              position: absolute;
              display: flex;
              flex-direction: column;

              & > p {
                margin-top: var(--spectrum-global-dimension-size-225) !important;
                margin-bottom: 0 !important;
              }

              @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                width: auto;
                padding: 0 var(--spectrum-global-dimension-size-400);
              }
            `}>
            <HeroHeading heading={heading} variant={variant} />

            <HeroTexts texts={props} />
          </div>
        </div>
      </section>
    );
  } else {
    const height = 'calc(var(--spectrum-global-dimension-size-6000) + var(--spectrum-global-dimension-size-250))';

    if (variant === 'fullwidth') {
      return (
        <section
          className={`spectrum--${theme}`}
          css={css`
            position: relative;
            width: 100%;
            height: ${height};
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};

            @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
              overflow: auto;
              padding: var(--spectrum-global-dimension-size-800) 0;
              height: 100vh;
            }
          `}>
          <HeroImage image={image} />

          <div
            css={css`
              height: 100%;
              position: absolute;
              top: 0;
              width: 100%;
              box-sizing: border-box;
              padding: 0 calc(var(--spectrum-global-dimension-size-3600) + var(--spectrum-global-dimension-size-125));
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;

              @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                padding: 0 var(--spectrum-global-dimension-size-400);
              }
            `}>
            <HeroHeading heading={heading} variant={variant} />

            <HeroTexts texts={props} />

            <HeroButtons buttons={buttons} variants={['cta', 'overBackground']} marginTop="size-400" />
          </div>
        </section>
      );
    } else if (variant === 'halfwidth') {
      return (
        <section
          className={`spectrum--lightest`}
          css={css`
            background: ${background ?? 'var(--spectrum-global-color-gray-50)'};
            height: ${height};
            overflow: hidden;

            @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
              height: auto;
              padding: var(--spectrum-global-dimension-size-400);
            }
          `}>
          <Flex justifyContent="center" height="100%">
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: calc(5 * 100% / 12);
                margin-left: var(--spectrum-global-dimension-size-800);
                margin-right: var(--spectrum-global-dimension-size-400);

                @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                  width: 100%;
                  margin: 0;
                }
              `}>
              {icon &&
                React.cloneElement(icon, {
                  css: css`
                    height: var(--spectrum-global-dimension-size-600);
                    width: var(--spectrum-global-dimension-size-600);
                    margin-top: 0 !important;
                    margin-bottom: var(--spectrum-global-dimension-size-300) !important;

                    img {
                      height: 100%;
                      object-fit: contain;
                    }
                  `
                })}

              <HeroHeading heading={heading} isVariant />

              <HeroTexts texts={props} />

              <HeroButtons buttons={buttons} marginTop="size-300" />
            </div>
            <div
              css={css`
                flex: 1;

                @media screen and (max-width: ${LARGE_SCREEN_WIDTH}) {
                  display: none;
                }
              `}>
              <HeroImage image={image} />
            </div>
          </Flex>
        </section>
      );
    }
  }
};

Hero.propTypes = {
  background: PropTypes.string,
  heading: PropTypes.element,
  text: PropTypes.element,
  image: PropTypes.element,
  icon: PropTypes.element,
  buttons: PropTypes.element,
  variant: PropTypes.string,
  width: PropTypes.string,
  theme: PropTypes.string
};

HeroButtons.propTypes = {
  buttons: PropTypes.element,
  variants: PropTypes.array,
  quiets: PropTypes.array
};

HeroImage.propTypes = {
  image: PropTypes.element
};

export { Hero, HeroImage, HeroButtons };

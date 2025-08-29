/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import CustomIndexDropdown from '@site/src/components/CustomIndexDropdown';
import type {NavbarItemComponentProps} from '@docusaurus/theme-common';

export default function CustomIndexDropdownNavbarItem(
  props: NavbarItemComponentProps,
): JSX.Element {
  if (props.type === 'custom-index-dropdown') {
    return <CustomIndexDropdown />;
  }

  return null;
}

/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";
import styles from "./styles.module.css";
function FloatingButton({ label, onClick, children }) {
  return (
    <div className={styles.floatingButton}>
      {label && (
        <button onClick={onClick} type="button">
          {label}
        </button>
      )}
      {children}
    </div>
  );
}
export default FloatingButton;

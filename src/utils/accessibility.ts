/**
 * Accessibility utilities for WCAG compliance
 */

// Skip link component styles
export const skipLinkStyles = `
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #002E5D;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 4px 0;
  }
  
  .skip-link:focus {
    top: 0;
  }
`;

// Announce screen reader messages
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Focus management utilities
export const focusManagement = {
  // Trap focus within a container (useful for modals)
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTab);
    
    // Return cleanup function
    return () => container.removeEventListener('keydown', handleTab);
  },
  
  // Restore focus to previous element
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },
  
  // Get currently focused element
  getCurrentFocus: (): HTMLElement | null => {
    return document.activeElement as HTMLElement;
  }
};

// Keyboard navigation helpers
export const keyboardNavigation = {
  // Handle arrow key navigation for lists/grids
  handleArrowKeys: (
    e: KeyboardEvent,
    items: NodeListOf<Element> | Element[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' | 'grid' = 'vertical',
    gridColumns?: number
  ): number => {
    const itemsArray = Array.from(items);
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowUp':
        if (orientation === 'vertical') {
          newIndex = Math.max(0, currentIndex - 1);
        } else if (orientation === 'grid' && gridColumns) {
          newIndex = Math.max(0, currentIndex - gridColumns);
        }
        break;
        
      case 'ArrowDown':
        if (orientation === 'vertical') {
          newIndex = Math.min(itemsArray.length - 1, currentIndex + 1);
        } else if (orientation === 'grid' && gridColumns) {
          newIndex = Math.min(itemsArray.length - 1, currentIndex + gridColumns);
        }
        break;
        
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'grid') {
          newIndex = Math.max(0, currentIndex - 1);
        }
        break;
        
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'grid') {
          newIndex = Math.min(itemsArray.length - 1, currentIndex + 1);
        }
        break;
        
      case 'Home':
        newIndex = 0;
        break;
        
      case 'End':
        newIndex = itemsArray.length - 1;
        break;
    }
    
    if (newIndex !== currentIndex) {
      e.preventDefault();
      (itemsArray[newIndex] as HTMLElement).focus();
    }
    
    return newIndex;
  }
};

// ARIA helpers
export const ariaHelpers = {
  // Set loading state
  setLoadingState: (element: HTMLElement, isLoading: boolean) => {
    element.setAttribute('aria-busy', isLoading.toString());
  },
  
  // Set expanded state
  setExpandedState: (element: HTMLElement, isExpanded: boolean) => {
    element.setAttribute('aria-expanded', isExpanded.toString());
  },
  
  // Set selected state
  setSelectedState: (element: HTMLElement, isSelected: boolean) => {
    element.setAttribute('aria-selected', isSelected.toString());
  },
  
  // Set invalid state with error message
  setInvalidState: (element: HTMLElement, isInvalid: boolean, errorId?: string) => {
    element.setAttribute('aria-invalid', isInvalid.toString());
    if (errorId && isInvalid) {
      element.setAttribute('aria-describedby', errorId);
    } else {
      element.removeAttribute('aria-describedby');
    }
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  relativeLuminance: (rgb: { r: number; g: number; b: number }): number => {
    const { r, g, b } = rgb;
    const sRGB = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  },
  
  // Calculate contrast ratio
  contrastRatio: (rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number => {
    const l1 = colorContrast.relativeLuminance(rgb1);
    const l2 = colorContrast.relativeLuminance(rgb2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },
  
  // Check if contrast meets WCAG standards
  meetsWCAG: (ratio: number, level: 'AA' | 'AAA' = 'AA', fontSize: 'normal' | 'large' = 'normal'): boolean => {
    if (level === 'AA') {
      return fontSize === 'large' ? ratio >= 3 : ratio >= 4.5;
    } else {
      return fontSize === 'large' ? ratio >= 4.5 : ratio >= 7;
    }
  }
};

// Semantic HTML helpers
export const semanticHTML = {
  // Create a properly structured heading hierarchy
  createHeading: (level: 1 | 2 | 3 | 4 | 5 | 6, text: string, className?: string): HTMLElement => {
    const heading = document.createElement(`h${level}`);
    heading.textContent = text;
    if (className) heading.className = className;
    return heading;
  },
  
  // Create a landmark region
  createLandmark: (
    role: 'banner' | 'navigation' | 'main' | 'complementary' | 'contentinfo',
    content: HTMLElement | string,
    label?: string
  ): HTMLElement => {
    const landmark = document.createElement('div');
    landmark.setAttribute('role', role);
    if (label) landmark.setAttribute('aria-label', label);
    
    if (typeof content === 'string') {
      landmark.innerHTML = content;
    } else {
      landmark.appendChild(content);
    }
    
    return landmark;
  }
};

// Form accessibility
export const formAccessibility = {
  // Associate label with form control
  associateLabel: (label: HTMLLabelElement, control: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    const id = control.id || `form-control-${Date.now()}`;
    control.id = id;
    label.setAttribute('for', id);
  },
  
  // Add error message association
  addErrorMessage: (control: HTMLElement, errorMessage: string): HTMLElement => {
    const errorId = `error-${control.id || Date.now()}`;
    const errorElement = document.createElement('span');
    errorElement.id = errorId;
    errorElement.className = 'error-message';
    errorElement.setAttribute('role', 'alert');
    errorElement.textContent = errorMessage;
    
    control.setAttribute('aria-describedby', errorId);
    control.setAttribute('aria-invalid', 'true');
    
    return errorElement;
  },
  
  // Add help text association
  addHelpText: (control: HTMLElement, helpText: string): HTMLElement => {
    const helpId = `help-${control.id || Date.now()}`;
    const helpElement = document.createElement('span');
    helpElement.id = helpId;
    helpElement.className = 'help-text';
    helpElement.textContent = helpText;
    
    const currentDescribedBy = control.getAttribute('aria-describedby');
    const newDescribedBy = currentDescribedBy ? `${currentDescribedBy} ${helpId}` : helpId;
    control.setAttribute('aria-describedby', newDescribedBy);
    
    return helpElement;
  }
};

// Media accessibility
export const mediaAccessibility = {
  // Pause all animations
  pauseAnimations: () => {
    document.documentElement.style.setProperty('--animation-play-state', 'paused');
    announceToScreenReader('Animations paused');
  },
  
  // Resume animations
  resumeAnimations: () => {
    document.documentElement.style.setProperty('--animation-play-state', 'running');
    announceToScreenReader('Animations resumed');
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Check if user prefers high contrast
  prefersHighContrast: (): boolean => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }
};

// Table accessibility
export const tableAccessibility = {
  // Add table caption
  addCaption: (table: HTMLTableElement, caption: string) => {
    const captionElement = document.createElement('caption');
    captionElement.textContent = caption;
    table.insertBefore(captionElement, table.firstChild);
  },
  
  // Make table sortable with proper ARIA
  makeSortable: (table: HTMLTableElement, sortableColumns: number[]) => {
    const headers = table.querySelectorAll('th');
    
    sortableColumns.forEach(colIndex => {
      const header = headers[colIndex];
      if (header) {
        header.setAttribute('aria-sort', 'none');
        header.setAttribute('role', 'columnheader');
        header.setAttribute('tabindex', '0');
        header.style.cursor = 'pointer';
        
        // Add visual indicator
        const indicator = document.createElement('span');
        indicator.setAttribute('aria-hidden', 'true');
        indicator.className = 'sort-indicator';
        header.appendChild(indicator);
      }
    });
  }
};

// Initialize accessibility features
export function initializeAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = skipLinkStyles;
  document.head.appendChild(style);
  
  // Set up focus visible polyfill
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
  
  // Handle prefers-reduced-motion
  if (mediaAccessibility.prefersReducedMotion()) {
    document.documentElement.classList.add('reduce-motion');
  }
  
  // Handle high contrast mode
  if (mediaAccessibility.prefersHighContrast()) {
    document.documentElement.classList.add('high-contrast');
  }
} 
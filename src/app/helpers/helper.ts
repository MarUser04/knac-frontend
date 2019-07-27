import { Toast } from 'angular2-toaster';
import { HttpHeaders } from '@angular/common/http';

export const readUploadedFileAsDataURL = inputFile => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    if (!inputFile) {
      resolve(null);
    }

    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new Error('Problem parsing input file.'));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export const headersFactory = (key: string, value: string): HttpHeaders =>
  new HttpHeaders({ key: value });

export const bodyParser = (payload): FormData => {
  const data = new FormData();
  for (const key in payload) {
    if (payload[key] && payload[key] instanceof Array) {
      payload[key].forEach((file: File) => data.append(key, file));
    } else if (payload[key]) {
      data.append(key, payload[key]);
    }
  }
  return data;
};

export const bodyParserToAllowSpaces = (payload): FormData => {
  const data = new FormData();
  for (const key in payload) {
    if (payload[key] && payload[key] instanceof Array) {
      payload[key].forEach((file: File) => data.append(key, file));
    } else {
      data.append(key, payload[key]);
    }
  }
  return data;
};

export const bodyParserToCompanyProfile = (payload): FormData => {
  const data = new FormData();
  for (const key in payload) {
    if (payload[key] && payload[key] instanceof Array) {
      payload[key].forEach((file: File) => data.append(key, file));
    } else if (key !== 'twitter' && key !== 'facebook') {
      data.append(key, payload[key]);
    }
  }
  return data;
};

/**
 * success Factory Toast
 **/
export const successToast = (body: string = ''): Toast => ({
  type: 'success', // 'error', 'success', 'info', 'warning'
  title: 'Success',
  body,
  showCloseButton: true
});

/**
 * error Factory Toast
 **/
export const errorToast = (body: string = ''): Toast => ({
  type: 'error',
  title: 'Error',
  body,
  showCloseButton: true
});

/**
 * info Factory Toast
 **/
export const infoToast = (body: string = ''): Toast => ({
  type: 'info',
  title: 'Info',
  body,
  showCloseButton: true
});

/**
 * warning Factory Toast
 **/
export const warnToast = (body: string = ''): Toast => ({
  type: 'warning',
  title: 'Warning',
  body,
  showCloseButton: true
});

export function paginate(totalItems, currentPage, pageSize, maxPages = 10) {
  if (currentPage === void 0) {
    currentPage = 1;
  }
  if (pageSize === void 0) {
    pageSize = 10;
  }
  if (maxPages === void 0) {
    maxPages = 10;
  }
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);
  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  let startPage, endPage;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }
  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  // create an array of pages to ng-repeat in the pager control
  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(function(
    i
  ) {
    return startPage + i;
  });
  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

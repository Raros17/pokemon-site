export function getPoketInfo(apiUrl: string) {
    return fetch(`${apiUrl}`)
      .then((res: Response) => res.json());
  }
  
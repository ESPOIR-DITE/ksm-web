import {Observable, of} from 'rxjs';

export class ApiErrors {
    public static handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T);
        };
    }
}


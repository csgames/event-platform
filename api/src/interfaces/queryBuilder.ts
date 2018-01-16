export type QBCondition = 'AND' | 'OR';

export type QBOperator = 'equal' | 'not_equal' | 'in' | 'not_in' | 'less' | 'less_or_equal'
    | 'greater' | 'greater_or_equal' | 'between' | 'not_between' | 'is_null' | 'is_not_null'
    | 'begins_with' | 'not_begins_with' | 'contains' | 'not_contains' | 'ends_with' | 'not_ends_with'
    | 'is_empty' | 'is_not_empty';

export interface QBRule {
    id: string;
    name: string;
    type: string;
    input: string;
    operator: QBOperator;
    value: string | string[];

    condition?: QBCondition;
    rules?: QBRule[];
    not?: boolean;
}

export interface QueryBuilder {
    condition: QBCondition;
    rules: QBRule[];
    not?: boolean;
    valid?: boolean;
}

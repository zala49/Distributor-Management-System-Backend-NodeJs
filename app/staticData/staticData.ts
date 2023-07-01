export const static_meta_data = [
    { Type: 'Role', Value: 'Super Admin' },
    { Type: 'Role', Value: 'Distributor' },
    { Type: 'Role', Value: 'Seller' },
] as const;

export const all_meta_data_type = [...new Set(static_meta_data.map(t => t.Type))];
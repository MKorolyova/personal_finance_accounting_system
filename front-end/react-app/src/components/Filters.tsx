import React  from 'react';
import { transactionTypes } from '../api/transactions/enums/transactionTypes.ts';
import { transactionCategories } from '../api/transactions/enums/transactionCategories.ts';
import Select from 'react-select';

export const Filters = ({setFilters, filters}) => {
    const categoryOptions = transactionCategories.map((c) => ({
        value: c,
        label: c
      }));


    return(
        <div className="filters">
            <div className="form-item">
                <p>Min Amount:</p>
                <input
                type="number"
                value={filters.higherThenAmount ?? ''}
                onChange={(e) => setFilters({ ...filters, higherThenAmount: Number(e.target.value) || undefined })}
                />
            </div>

            <div className="form-item">
                <p>Max Amount:</p>
                <input
                type="number"
                value={filters.lowerThenAmount ?? ''}
                onChange={(e) => setFilters({ ...filters, lowerThenAmount: Number(e.target.value) || undefined })}
                />
            </div>

            <div className="form-item">
                <p>Type:</p>
                <select
                value={filters.type?.[0] ?? ''}
                onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value ? [e.target.value] : undefined })}
                >
                <option value="">-- All --</option>
                {transactionTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
                </select>
            </div>

            <div className="form-item">
                <p>Category:</p>

                <Select
                isMulti
                placeholder="--All--"
                options={categoryOptions}
                value={filters.category?.map(c => ({ value: c, label: c })) ?? []}
                onChange={(selected) =>
                    setFilters({
                    ...filters,
                    category: selected.length ? selected.map((s) => s.value) : undefined
                    })
                }
                styles={{
                    control: () => ({
                    border: '2px solid black',
                    borderRadius: '9px',
                    backgroundColor: 'white',
                    color: 'black',
                    fontSize: '16px',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '250px'
                    }),
                    option: (state) => ({
                    backgroundColor: state.isSelected || state.isFocused ? 'black' : 'white',
                    color: state.isSelected || state.isFocused ? 'white' : 'black',
                    cursor: 'pointer',
                    padding: '15px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    ':active': {
                        backgroundColor: 'black',
                        color: "white"
                    }
                    }),
                    multiValue: () => ({
                    backgroundColor: 'white',
                    border: '2px solid black',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '5px',
                    color: 'black',
                    fontSize: '16px',
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center'
                    }),
                    multiValueLabel: () => ({
                    fontSize: '16px', 
                    color: 'black',
                    marginRight: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }),
                    multiValueRemove: () => ({
                    color: 'gray',
                    fontSize: '16px', 
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ':hover': {
                        color: 'black',
                    },
                    }),

                    placeholder: (base) => ({
                    ...base,
                    color: 'black', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 1     
                    }),
                }}
                />

            </div>

            <div className="form-item">
                <p>Start Date:</p>
                <input
                type="date"
                value={filters.transactionStartDate ?? ''}
                onChange={(e) => setFilters({ ...filters, transactionStartDate: e.target.value || undefined })}
                />
            </div>

            <div className="form-item">
                <p>End Date:</p>
                <input
                type="date"
                value={filters.transactionEndDate ?? ''}
                onChange={(e) => setFilters({ ...filters, transactionEndDate: e.target.value || undefined })}
                />
            </div>
        </div>
    )
}
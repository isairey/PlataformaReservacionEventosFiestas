"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeatures = void 0;
class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
        this.limit = 5;
        this.page = 1;
    }
    pagination() {
        let page = Math.abs(Number(this.searchQuery.page)) || 1;
        let limit = Number(this.searchQuery.limit) || 5;
        let offset = (page - 1) * limit;
        this.mongooseQuery.skip(offset).limit(limit);
        this.page = page;
        this.limit = limit;
        return this;
    }
    filter() {
        let qualifiedQuery = JSON.parse(JSON.stringify(this.searchQuery));
        qualifiedQuery = JSON.stringify(qualifiedQuery).replace(/gt|gte|lt|lte/g, (value) => "$" + value);
        qualifiedQuery = JSON.parse(qualifiedQuery);
        let excludedFields = ["page", "sort", "fields", "search"];
        excludedFields.forEach((ele) => delete qualifiedQuery[ele]);
        this.mongooseQuery.find(qualifiedQuery);
        return this;
    }
    sort() {
        if (this.searchQuery.sort) {
            this.searchQuery.sort = this.searchQuery.sort.replace(/,/g, " ");
            this.mongooseQuery.sort(this.searchQuery.sort);
        }
        return this;
    }
    select() {
        if (this.searchQuery.fields) {
            this.searchQuery.fields = this.searchQuery.fields.replace(/,/g, " ");
            this.mongooseQuery.select(this.searchQuery.fields);
        }
        return this;
    }
    search() {
        if (this.searchQuery.search) {
            this.searchQuery.search = this.searchQuery.search.replace(/,/g, " ");
            this.mongooseQuery.find({
                $or: [
                    { location: { $regex: this.searchQuery.search, $options: "i" } },
                    { desc: { $regex: this.searchQuery.search, $options: "i" } },
                    { name: { $regex: this.searchQuery.search, $options: "i" } },
                ],
            });
        }
        return this;
    }
}
exports.ApiFeatures = ApiFeatures;

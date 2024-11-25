class ApiFeatures{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    Paginate(countDocuments){
        const page=this.queryString.page *1 ||1;
        const limit=this.queryString.limit*1 || 50;
        const skip=(page -1 )*limit;

        const endIndex=limit*page;

        const pagination = {};
        pagination.currentPage=page;
        pagination.limit=limit;
        pagination.numberOfPages=Math.ceil(countDocuments/limit);

        if(endIndex<countDocuments){
            pagination.next=page+1
        }
        
        if(skip>0){
            pagination.prev=page-1;
        }

        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit)
        this.pagination=pagination;
        return this
    }
    Filter(){
        const queryStringObj={...this.queryString};
        const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
        excludesFields.forEach((field) => {
            delete queryStringObj[field];
          });

        let queryStr=JSON.stringify(queryStringObj);
        queryStr=queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`);

        this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryStr));

        return this;
        
    }
}

module.exports =ApiFeatures
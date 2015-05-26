

exports.companies = function (req, res, next) {
    companies.find().sort({registeredAt: -1}, function (err, companies) {
        if (err) {
            return next(err);
        }
        return res.json(companies);
    });
};

exports.saveCompany = function (req, res, next) {
    var company = {
        "name": req.body.name,
        "description": req.body.description,
        "registeredAt": new Date(),
        "contactEmail": req.body.contactEmail,
        "jobs": []
    };
    companies.save(company, function (err, saved) {
        if (err) {
            return next(err);
        }
        console.log(saved);
        res.json(saved);
    })
};

exports.jobsForCompany = function (req, res, next) {
    var companyId = req.param('companyId');
    companies.findOne({"_id": mongojs.ObjectId(companyId)}, function (err, company) {
        if (err) {
            return next(err);
        }
        return res.json(company.jobs);
    });

};

exports.postJobForCompany = function (req, res, next) {
    var companyId = req.param('companyId');
    var job = {
        "title": req.body.title,
        "description": req.body.description
    }

    companies.update({"_id": mongojs.ObjectId(companyId)}, {$push: {"jobs": job}}, function (err, result) {
        if (err) {
            return next(err);
        }
        return companies.findOne({"_id": mongojs.ObjectId(companyId)}, function (err, company) {
            if (err) {
                return next(err);
            }

            return res.json(company);
        })
    })
};

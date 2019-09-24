
const isObject = (it) => it && typeof it === 'object';

const compare = (reference, to_check)  =>
{
    let errors = [];

    for (let key in reference) 
    {
        let v1 = reference[key];
        let v2 = to_check[key];

        if (isObject(v1)) 
        {
            compare(v1, v2 || {}).forEach(r =>  errors.push(r));
        }
        else 
        {
            const is_same_type = typeof v1 === typeof v2;
            if(!is_same_type)
            {
                pushError(key, typeof v1,typeof v2, errors);
            }
        }   
    }

    return errors;
}

let pushError = (key, required_type, send_type, source = []) =>
{
    let erro =
    {
        key: key,
        required: required_type ,
        informed: send_type
    }
    source.push(erro);
}

module.exports = { pushError, isObject, compare }

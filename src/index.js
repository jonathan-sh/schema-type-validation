
const isObject = (it) => it && typeof it === 'object';

const isArray = (it) => isObject(it) && it.length != undefined;

const arrayType = (it) => 
{
    try 
    {
        const set = new Set(it.map(i => typeof i));
        return Array.from(set);
    } 
    catch (error) 
    {
        return it;
    }
}

const pushError = (key, required_type, send_type, erros = []) =>
{
    let erro =
    {
        key: key,
        required: required_type ,
        informed: send_type
    }
    erros.push(erro);
}

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

module.exports = { pushError, isObject, compare, isArray, arrayType }


const isObject = (it) => it && typeof it === 'object';

const isArray = (it) => isObject(it) && it.length != undefined;

const getArrayType = (it) => 
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
            if(isArray(v1))
            {
                const required = getArrayType(v1).toString();
                const informed = getArrayType(v2).toString();
                const is_same_type = required === informed;
                if(!is_same_type)
                {
                    pushError(key, required, informed, errors);
                }
            }
            else
            {
                compare(v1, v2 || {}).forEach(it => 
                {
                    pushError(it.key, it.required, it.informed, errors)
                });
            }
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

module.exports = { pushError, isObject, compare, isArray, getArrayType }

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SignupRequest = $root.SignupRequest = (() => {

    /**
     * Properties of a SignupRequest.
     * @typedef {Object} SignupRequest.$Properties
     * @property {string|null} [firstName] SignupRequest firstName
     * @property {string|null} [lastName] SignupRequest lastName
     * @property {string|null} [email] SignupRequest email
     * @property {string|null} [password] SignupRequest password
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a SignupRequest.
     * @exports ISignupRequest
     * @interface ISignupRequest
     * @augments SignupRequest.$Properties
     * @deprecated Use SignupRequest.$Properties instead.
     */

    /**
     * Shape of a SignupRequest.
     * @typedef {SignupRequest.$Properties} SignupRequest.$Shape
     */

    /**
     * Constructs a new SignupRequest.
     * @exports SignupRequest
     * @classdesc Represents a SignupRequest.
     * @constructor
     * @param {SignupRequest.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function SignupRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SignupRequest firstName.
     * @member {string} firstName
     * @memberof SignupRequest
     * @instance
     */
    SignupRequest.prototype.firstName = "";

    /**
     * SignupRequest lastName.
     * @member {string} lastName
     * @memberof SignupRequest
     * @instance
     */
    SignupRequest.prototype.lastName = "";

    /**
     * SignupRequest email.
     * @member {string} email
     * @memberof SignupRequest
     * @instance
     */
    SignupRequest.prototype.email = "";

    /**
     * SignupRequest password.
     * @member {string} password
     * @memberof SignupRequest
     * @instance
     */
    SignupRequest.prototype.password = "";

    /**
     * Creates a new SignupRequest instance using the specified properties.
     * @function create
     * @memberof SignupRequest
     * @static
     * @param {SignupRequest.$Properties=} [properties] Properties to set
     * @returns {SignupRequest} SignupRequest instance
     * @type {{
     *   (properties: SignupRequest.$Shape): SignupRequest & SignupRequest.$Shape;
     *   (properties?: SignupRequest.$Properties): SignupRequest;
     * }}
     */
    SignupRequest.create = function create(properties) {
        return new SignupRequest(properties);
    };

    /**
     * Encodes the specified SignupRequest message. Does not implicitly {@link SignupRequest.verify|verify} messages.
     * @function encode
     * @memberof SignupRequest
     * @static
     * @param {SignupRequest.$Properties} message SignupRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignupRequest.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.firstName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lastName);
        if (message.email != null && Object.hasOwnProperty.call(message, "email"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
        if (message.password != null && Object.hasOwnProperty.call(message, "password"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.password);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified SignupRequest message, length delimited. Does not implicitly {@link SignupRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SignupRequest
     * @static
     * @param {SignupRequest.$Properties} message SignupRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignupRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a SignupRequest message from the specified reader or buffer.
     * @function decode
     * @memberof SignupRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SignupRequest & SignupRequest.$Shape} SignupRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignupRequest.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.SignupRequest(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.firstName = value;
                    else
                        delete message.firstName;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.lastName = value;
                    else
                        delete message.lastName;
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.email = value;
                    else
                        delete message.email;
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.password = value;
                    else
                        delete message.password;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a SignupRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SignupRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SignupRequest & SignupRequest.$Shape} SignupRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignupRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SignupRequest message.
     * @function verify
     * @memberof SignupRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SignupRequest.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        if (message.email != null && message.hasOwnProperty("email"))
            if (!$util.isString(message.email))
                return "email: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
        return null;
    };

    /**
     * Creates a SignupRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SignupRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SignupRequest} SignupRequest
     */
    SignupRequest.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.SignupRequest)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".SignupRequest: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.SignupRequest();
        if (object.firstName != null)
            if (typeof object.firstName !== "string" || object.firstName.length)
                message.firstName = String(object.firstName);
        if (object.lastName != null)
            if (typeof object.lastName !== "string" || object.lastName.length)
                message.lastName = String(object.lastName);
        if (object.email != null)
            if (typeof object.email !== "string" || object.email.length)
                message.email = String(object.email);
        if (object.password != null)
            if (typeof object.password !== "string" || object.password.length)
                message.password = String(object.password);
        return message;
    };

    /**
     * Creates a plain object from a SignupRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SignupRequest
     * @static
     * @param {SignupRequest} message SignupRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SignupRequest.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.firstName = "";
            object.lastName = "";
            object.email = "";
            object.password = "";
        }
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        if (message.email != null && message.hasOwnProperty("email"))
            object.email = message.email;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        return object;
    };

    /**
     * Converts this SignupRequest to JSON.
     * @function toJSON
     * @memberof SignupRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SignupRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for SignupRequest
     * @function getTypeUrl
     * @memberof SignupRequest
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    SignupRequest.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/SignupRequest";
    };

    return SignupRequest;
})();

export const SignupResponse = $root.SignupResponse = (() => {

    /**
     * Properties of a SignupResponse.
     * @typedef {Object} SignupResponse.$Properties
     * @property {boolean|null} [success] SignupResponse success
     * @property {string|null} [message] SignupResponse message
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a SignupResponse.
     * @exports ISignupResponse
     * @interface ISignupResponse
     * @augments SignupResponse.$Properties
     * @deprecated Use SignupResponse.$Properties instead.
     */

    /**
     * Shape of a SignupResponse.
     * @typedef {SignupResponse.$Properties} SignupResponse.$Shape
     */

    /**
     * Constructs a new SignupResponse.
     * @exports SignupResponse
     * @classdesc Represents a SignupResponse.
     * @constructor
     * @param {SignupResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function SignupResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SignupResponse success.
     * @member {boolean} success
     * @memberof SignupResponse
     * @instance
     */
    SignupResponse.prototype.success = false;

    /**
     * SignupResponse message.
     * @member {string} message
     * @memberof SignupResponse
     * @instance
     */
    SignupResponse.prototype.message = "";

    /**
     * Creates a new SignupResponse instance using the specified properties.
     * @function create
     * @memberof SignupResponse
     * @static
     * @param {SignupResponse.$Properties=} [properties] Properties to set
     * @returns {SignupResponse} SignupResponse instance
     * @type {{
     *   (properties: SignupResponse.$Shape): SignupResponse & SignupResponse.$Shape;
     *   (properties?: SignupResponse.$Properties): SignupResponse;
     * }}
     */
    SignupResponse.create = function create(properties) {
        return new SignupResponse(properties);
    };

    /**
     * Encodes the specified SignupResponse message. Does not implicitly {@link SignupResponse.verify|verify} messages.
     * @function encode
     * @memberof SignupResponse
     * @static
     * @param {SignupResponse.$Properties} message SignupResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignupResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified SignupResponse message, length delimited. Does not implicitly {@link SignupResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SignupResponse
     * @static
     * @param {SignupResponse.$Properties} message SignupResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SignupResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a SignupResponse message from the specified reader or buffer.
     * @function decode
     * @memberof SignupResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SignupResponse & SignupResponse.$Shape} SignupResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignupResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.SignupResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a SignupResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SignupResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SignupResponse & SignupResponse.$Shape} SignupResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SignupResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SignupResponse message.
     * @function verify
     * @memberof SignupResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SignupResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates a SignupResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SignupResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SignupResponse} SignupResponse
     */
    SignupResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.SignupResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".SignupResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.SignupResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a SignupResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SignupResponse
     * @static
     * @param {SignupResponse} message SignupResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SignupResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this SignupResponse to JSON.
     * @function toJSON
     * @memberof SignupResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SignupResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for SignupResponse
     * @function getTypeUrl
     * @memberof SignupResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    SignupResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/SignupResponse";
    };

    return SignupResponse;
})();

export const LoginRequest = $root.LoginRequest = (() => {

    /**
     * Properties of a LoginRequest.
     * @typedef {Object} LoginRequest.$Properties
     * @property {string|null} [email] LoginRequest email
     * @property {string|null} [password] LoginRequest password
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a LoginRequest.
     * @exports ILoginRequest
     * @interface ILoginRequest
     * @augments LoginRequest.$Properties
     * @deprecated Use LoginRequest.$Properties instead.
     */

    /**
     * Shape of a LoginRequest.
     * @typedef {LoginRequest.$Properties} LoginRequest.$Shape
     */

    /**
     * Constructs a new LoginRequest.
     * @exports LoginRequest
     * @classdesc Represents a LoginRequest.
     * @constructor
     * @param {LoginRequest.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function LoginRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LoginRequest email.
     * @member {string} email
     * @memberof LoginRequest
     * @instance
     */
    LoginRequest.prototype.email = "";

    /**
     * LoginRequest password.
     * @member {string} password
     * @memberof LoginRequest
     * @instance
     */
    LoginRequest.prototype.password = "";

    /**
     * Creates a new LoginRequest instance using the specified properties.
     * @function create
     * @memberof LoginRequest
     * @static
     * @param {LoginRequest.$Properties=} [properties] Properties to set
     * @returns {LoginRequest} LoginRequest instance
     * @type {{
     *   (properties: LoginRequest.$Shape): LoginRequest & LoginRequest.$Shape;
     *   (properties?: LoginRequest.$Properties): LoginRequest;
     * }}
     */
    LoginRequest.create = function create(properties) {
        return new LoginRequest(properties);
    };

    /**
     * Encodes the specified LoginRequest message. Does not implicitly {@link LoginRequest.verify|verify} messages.
     * @function encode
     * @memberof LoginRequest
     * @static
     * @param {LoginRequest.$Properties} message LoginRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginRequest.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.email != null && Object.hasOwnProperty.call(message, "email"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
        if (message.password != null && Object.hasOwnProperty.call(message, "password"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link LoginRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LoginRequest
     * @static
     * @param {LoginRequest.$Properties} message LoginRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a LoginRequest message from the specified reader or buffer.
     * @function decode
     * @memberof LoginRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LoginRequest & LoginRequest.$Shape} LoginRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginRequest.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.LoginRequest(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.email = value;
                    else
                        delete message.email;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.password = value;
                    else
                        delete message.password;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LoginRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LoginRequest & LoginRequest.$Shape} LoginRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LoginRequest message.
     * @function verify
     * @memberof LoginRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LoginRequest.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.email != null && message.hasOwnProperty("email"))
            if (!$util.isString(message.email))
                return "email: string expected";
        if (message.password != null && message.hasOwnProperty("password"))
            if (!$util.isString(message.password))
                return "password: string expected";
        return null;
    };

    /**
     * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LoginRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LoginRequest} LoginRequest
     */
    LoginRequest.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.LoginRequest)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".LoginRequest: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.LoginRequest();
        if (object.email != null)
            if (typeof object.email !== "string" || object.email.length)
                message.email = String(object.email);
        if (object.password != null)
            if (typeof object.password !== "string" || object.password.length)
                message.password = String(object.password);
        return message;
    };

    /**
     * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LoginRequest
     * @static
     * @param {LoginRequest} message LoginRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LoginRequest.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.email = "";
            object.password = "";
        }
        if (message.email != null && message.hasOwnProperty("email"))
            object.email = message.email;
        if (message.password != null && message.hasOwnProperty("password"))
            object.password = message.password;
        return object;
    };

    /**
     * Converts this LoginRequest to JSON.
     * @function toJSON
     * @memberof LoginRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LoginRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for LoginRequest
     * @function getTypeUrl
     * @memberof LoginRequest
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    LoginRequest.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/LoginRequest";
    };

    return LoginRequest;
})();

export const LoginResponse = $root.LoginResponse = (() => {

    /**
     * Properties of a LoginResponse.
     * @typedef {Object} LoginResponse.$Properties
     * @property {boolean|null} [success] LoginResponse success
     * @property {string|null} [message] LoginResponse message
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a LoginResponse.
     * @exports ILoginResponse
     * @interface ILoginResponse
     * @augments LoginResponse.$Properties
     * @deprecated Use LoginResponse.$Properties instead.
     */

    /**
     * Shape of a LoginResponse.
     * @typedef {LoginResponse.$Properties} LoginResponse.$Shape
     */

    /**
     * Constructs a new LoginResponse.
     * @exports LoginResponse
     * @classdesc Represents a LoginResponse.
     * @constructor
     * @param {LoginResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function LoginResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LoginResponse success.
     * @member {boolean} success
     * @memberof LoginResponse
     * @instance
     */
    LoginResponse.prototype.success = false;

    /**
     * LoginResponse message.
     * @member {string} message
     * @memberof LoginResponse
     * @instance
     */
    LoginResponse.prototype.message = "";

    /**
     * Creates a new LoginResponse instance using the specified properties.
     * @function create
     * @memberof LoginResponse
     * @static
     * @param {LoginResponse.$Properties=} [properties] Properties to set
     * @returns {LoginResponse} LoginResponse instance
     * @type {{
     *   (properties: LoginResponse.$Shape): LoginResponse & LoginResponse.$Shape;
     *   (properties?: LoginResponse.$Properties): LoginResponse;
     * }}
     */
    LoginResponse.create = function create(properties) {
        return new LoginResponse(properties);
    };

    /**
     * Encodes the specified LoginResponse message. Does not implicitly {@link LoginResponse.verify|verify} messages.
     * @function encode
     * @memberof LoginResponse
     * @static
     * @param {LoginResponse.$Properties} message LoginResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link LoginResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LoginResponse
     * @static
     * @param {LoginResponse.$Properties} message LoginResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a LoginResponse message from the specified reader or buffer.
     * @function decode
     * @memberof LoginResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LoginResponse & LoginResponse.$Shape} LoginResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.LoginResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LoginResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LoginResponse & LoginResponse.$Shape} LoginResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LoginResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LoginResponse message.
     * @function verify
     * @memberof LoginResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LoginResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LoginResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LoginResponse} LoginResponse
     */
    LoginResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.LoginResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".LoginResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.LoginResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LoginResponse
     * @static
     * @param {LoginResponse} message LoginResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LoginResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this LoginResponse to JSON.
     * @function toJSON
     * @memberof LoginResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LoginResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for LoginResponse
     * @function getTypeUrl
     * @memberof LoginResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    LoginResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/LoginResponse";
    };

    return LoginResponse;
})();

export const UserResponse = $root.UserResponse = (() => {

    /**
     * Properties of a UserResponse.
     * @typedef {Object} UserResponse.$Properties
     * @property {boolean|null} [success] UserResponse success
     * @property {string|null} [message] UserResponse message
     * @property {number|Long|null} [userId] UserResponse userId
     * @property {string|null} [email] UserResponse email
     * @property {string|null} [firstName] UserResponse firstName
     * @property {string|null} [lastName] UserResponse lastName
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a UserResponse.
     * @exports IUserResponse
     * @interface IUserResponse
     * @augments UserResponse.$Properties
     * @deprecated Use UserResponse.$Properties instead.
     */

    /**
     * Shape of a UserResponse.
     * @typedef {UserResponse.$Properties} UserResponse.$Shape
     */

    /**
     * Constructs a new UserResponse.
     * @exports UserResponse
     * @classdesc Represents a UserResponse.
     * @constructor
     * @param {UserResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function UserResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UserResponse success.
     * @member {boolean} success
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.success = false;

    /**
     * UserResponse message.
     * @member {string} message
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.message = "";

    /**
     * UserResponse userId.
     * @member {number|Long} userId
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * UserResponse email.
     * @member {string} email
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.email = "";

    /**
     * UserResponse firstName.
     * @member {string} firstName
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.firstName = "";

    /**
     * UserResponse lastName.
     * @member {string} lastName
     * @memberof UserResponse
     * @instance
     */
    UserResponse.prototype.lastName = "";

    /**
     * Creates a new UserResponse instance using the specified properties.
     * @function create
     * @memberof UserResponse
     * @static
     * @param {UserResponse.$Properties=} [properties] Properties to set
     * @returns {UserResponse} UserResponse instance
     * @type {{
     *   (properties: UserResponse.$Shape): UserResponse & UserResponse.$Shape;
     *   (properties?: UserResponse.$Properties): UserResponse;
     * }}
     */
    UserResponse.create = function create(properties) {
        return new UserResponse(properties);
    };

    /**
     * Encodes the specified UserResponse message. Does not implicitly {@link UserResponse.verify|verify} messages.
     * @function encode
     * @memberof UserResponse
     * @static
     * @param {UserResponse.$Properties} message UserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UserResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.userId);
        if (message.email != null && Object.hasOwnProperty.call(message, "email"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.email);
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.firstName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.lastName);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link UserResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UserResponse
     * @static
     * @param {UserResponse.$Properties} message UserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UserResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a UserResponse message from the specified reader or buffer.
     * @function decode
     * @memberof UserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UserResponse & UserResponse.$Shape} UserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UserResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.UserResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                        message.userId = value;
                    else
                        delete message.userId;
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.email = value;
                    else
                        delete message.email;
                    continue;
                }
            case 5: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.firstName = value;
                    else
                        delete message.firstName;
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.lastName = value;
                    else
                        delete message.lastName;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a UserResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UserResponse & UserResponse.$Shape} UserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UserResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a UserResponse message.
     * @function verify
     * @memberof UserResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UserResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                return "userId: integer|Long expected";
        if (message.email != null && message.hasOwnProperty("email"))
            if (!$util.isString(message.email))
                return "email: string expected";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        return null;
    };

    /**
     * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UserResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UserResponse} UserResponse
     */
    UserResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.UserResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".UserResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.UserResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        if (object.userId != null)
            if (typeof object.userId === "object" ? object.userId.low || object.userId.high : Number(object.userId) !== 0)
                if ($util.Long)
                    message.userId = $util.Long.fromValue(object.userId, true);
                else if (typeof object.userId === "string")
                    message.userId = parseInt(object.userId, 10);
                else if (typeof object.userId === "number")
                    message.userId = object.userId;
                else if (typeof object.userId === "object")
                    message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber(true);
        if (object.email != null)
            if (typeof object.email !== "string" || object.email.length)
                message.email = String(object.email);
        if (object.firstName != null)
            if (typeof object.firstName !== "string" || object.firstName.length)
                message.firstName = String(object.firstName);
        if (object.lastName != null)
            if (typeof object.lastName !== "string" || object.lastName.length)
                message.lastName = String(object.lastName);
        return message;
    };

    /**
     * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UserResponse
     * @static
     * @param {UserResponse} message UserResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UserResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
            } else
                object.userId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            object.email = "";
            object.firstName = "";
            object.lastName = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (typeof BigInt !== "undefined" && options.longs === BigInt)
                object.userId = typeof message.userId === "number" ? BigInt(message.userId) : $util.Long.fromBits(message.userId.low >>> 0, message.userId.high >>> 0, true).toBigInt();
            else if (typeof message.userId === "number")
                object.userId = options.longs === String ? String(message.userId) : message.userId;
            else
                object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber(true) : message.userId;
        if (message.email != null && message.hasOwnProperty("email"))
            object.email = message.email;
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        return object;
    };

    /**
     * Converts this UserResponse to JSON.
     * @function toJSON
     * @memberof UserResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UserResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for UserResponse
     * @function getTypeUrl
     * @memberof UserResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    UserResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/UserResponse";
    };

    return UserResponse;
})();

export const AuthStatusResponse = $root.AuthStatusResponse = (() => {

    /**
     * Properties of an AuthStatusResponse.
     * @typedef {Object} AuthStatusResponse.$Properties
     * @property {boolean|null} [success] AuthStatusResponse success
     * @property {string|null} [message] AuthStatusResponse message
     * @property {number|null} [code] AuthStatusResponse code
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of an AuthStatusResponse.
     * @exports IAuthStatusResponse
     * @interface IAuthStatusResponse
     * @augments AuthStatusResponse.$Properties
     * @deprecated Use AuthStatusResponse.$Properties instead.
     */

    /**
     * Shape of an AuthStatusResponse.
     * @typedef {AuthStatusResponse.$Properties} AuthStatusResponse.$Shape
     */

    /**
     * Constructs a new AuthStatusResponse.
     * @exports AuthStatusResponse
     * @classdesc Represents an AuthStatusResponse.
     * @constructor
     * @param {AuthStatusResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function AuthStatusResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthStatusResponse success.
     * @member {boolean} success
     * @memberof AuthStatusResponse
     * @instance
     */
    AuthStatusResponse.prototype.success = false;

    /**
     * AuthStatusResponse message.
     * @member {string} message
     * @memberof AuthStatusResponse
     * @instance
     */
    AuthStatusResponse.prototype.message = "";

    /**
     * AuthStatusResponse code.
     * @member {number} code
     * @memberof AuthStatusResponse
     * @instance
     */
    AuthStatusResponse.prototype.code = 0;

    /**
     * Creates a new AuthStatusResponse instance using the specified properties.
     * @function create
     * @memberof AuthStatusResponse
     * @static
     * @param {AuthStatusResponse.$Properties=} [properties] Properties to set
     * @returns {AuthStatusResponse} AuthStatusResponse instance
     * @type {{
     *   (properties: AuthStatusResponse.$Shape): AuthStatusResponse & AuthStatusResponse.$Shape;
     *   (properties?: AuthStatusResponse.$Properties): AuthStatusResponse;
     * }}
     */
    AuthStatusResponse.create = function create(properties) {
        return new AuthStatusResponse(properties);
    };

    /**
     * Encodes the specified AuthStatusResponse message. Does not implicitly {@link AuthStatusResponse.verify|verify} messages.
     * @function encode
     * @memberof AuthStatusResponse
     * @static
     * @param {AuthStatusResponse.$Properties} message AuthStatusResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthStatusResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.code);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified AuthStatusResponse message, length delimited. Does not implicitly {@link AuthStatusResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthStatusResponse
     * @static
     * @param {AuthStatusResponse.$Properties} message AuthStatusResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthStatusResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an AuthStatusResponse message from the specified reader or buffer.
     * @function decode
     * @memberof AuthStatusResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthStatusResponse & AuthStatusResponse.$Shape} AuthStatusResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthStatusResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.AuthStatusResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.int32())
                        message.code = value;
                    else
                        delete message.code;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes an AuthStatusResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthStatusResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthStatusResponse & AuthStatusResponse.$Shape} AuthStatusResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthStatusResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthStatusResponse message.
     * @function verify
     * @memberof AuthStatusResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthStatusResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code))
                return "code: integer expected";
        return null;
    };

    /**
     * Creates an AuthStatusResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthStatusResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthStatusResponse} AuthStatusResponse
     */
    AuthStatusResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.AuthStatusResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".AuthStatusResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.AuthStatusResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        if (object.code != null)
            if (Number(object.code) !== 0)
                message.code = object.code | 0;
        return message;
    };

    /**
     * Creates a plain object from an AuthStatusResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthStatusResponse
     * @static
     * @param {AuthStatusResponse} message AuthStatusResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthStatusResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
            object.code = 0;
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        return object;
    };

    /**
     * Converts this AuthStatusResponse to JSON.
     * @function toJSON
     * @memberof AuthStatusResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthStatusResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for AuthStatusResponse
     * @function getTypeUrl
     * @memberof AuthStatusResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    AuthStatusResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/AuthStatusResponse";
    };

    return AuthStatusResponse;
})();

export const VerifyResponse = $root.VerifyResponse = (() => {

    /**
     * Properties of a VerifyResponse.
     * @typedef {Object} VerifyResponse.$Properties
     * @property {boolean|null} [valid] VerifyResponse valid
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of a VerifyResponse.
     * @exports IVerifyResponse
     * @interface IVerifyResponse
     * @augments VerifyResponse.$Properties
     * @deprecated Use VerifyResponse.$Properties instead.
     */

    /**
     * Shape of a VerifyResponse.
     * @typedef {VerifyResponse.$Properties} VerifyResponse.$Shape
     */

    /**
     * Constructs a new VerifyResponse.
     * @exports VerifyResponse
     * @classdesc Represents a VerifyResponse.
     * @constructor
     * @param {VerifyResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function VerifyResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * VerifyResponse valid.
     * @member {boolean} valid
     * @memberof VerifyResponse
     * @instance
     */
    VerifyResponse.prototype.valid = false;

    /**
     * Creates a new VerifyResponse instance using the specified properties.
     * @function create
     * @memberof VerifyResponse
     * @static
     * @param {VerifyResponse.$Properties=} [properties] Properties to set
     * @returns {VerifyResponse} VerifyResponse instance
     * @type {{
     *   (properties: VerifyResponse.$Shape): VerifyResponse & VerifyResponse.$Shape;
     *   (properties?: VerifyResponse.$Properties): VerifyResponse;
     * }}
     */
    VerifyResponse.create = function create(properties) {
        return new VerifyResponse(properties);
    };

    /**
     * Encodes the specified VerifyResponse message. Does not implicitly {@link VerifyResponse.verify|verify} messages.
     * @function encode
     * @memberof VerifyResponse
     * @static
     * @param {VerifyResponse.$Properties} message VerifyResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VerifyResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.valid != null && Object.hasOwnProperty.call(message, "valid"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.valid);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified VerifyResponse message, length delimited. Does not implicitly {@link VerifyResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof VerifyResponse
     * @static
     * @param {VerifyResponse.$Properties} message VerifyResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VerifyResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes a VerifyResponse message from the specified reader or buffer.
     * @function decode
     * @memberof VerifyResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {VerifyResponse & VerifyResponse.$Shape} VerifyResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VerifyResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.VerifyResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.valid = value;
                    else
                        delete message.valid;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a VerifyResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof VerifyResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {VerifyResponse & VerifyResponse.$Shape} VerifyResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VerifyResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a VerifyResponse message.
     * @function verify
     * @memberof VerifyResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    VerifyResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.valid != null && message.hasOwnProperty("valid"))
            if (typeof message.valid !== "boolean")
                return "valid: boolean expected";
        return null;
    };

    /**
     * Creates a VerifyResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof VerifyResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {VerifyResponse} VerifyResponse
     */
    VerifyResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.VerifyResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".VerifyResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.VerifyResponse();
        if (object.valid != null)
            if (object.valid)
                message.valid = Boolean(object.valid);
        return message;
    };

    /**
     * Creates a plain object from a VerifyResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof VerifyResponse
     * @static
     * @param {VerifyResponse} message VerifyResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    VerifyResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults)
            object.valid = false;
        if (message.valid != null && message.hasOwnProperty("valid"))
            object.valid = message.valid;
        return object;
    };

    /**
     * Converts this VerifyResponse to JSON.
     * @function toJSON
     * @memberof VerifyResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    VerifyResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for VerifyResponse
     * @function getTypeUrl
     * @memberof VerifyResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    VerifyResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/VerifyResponse";
    };

    return VerifyResponse;
})();

export const AddContactRequest = $root.AddContactRequest = (() => {

    /**
     * Properties of an AddContactRequest.
     * @typedef {Object} AddContactRequest.$Properties
     * @property {string|null} [email] AddContactRequest email
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of an AddContactRequest.
     * @exports IAddContactRequest
     * @interface IAddContactRequest
     * @augments AddContactRequest.$Properties
     * @deprecated Use AddContactRequest.$Properties instead.
     */

    /**
     * Shape of an AddContactRequest.
     * @typedef {AddContactRequest.$Properties} AddContactRequest.$Shape
     */

    /**
     * Constructs a new AddContactRequest.
     * @exports AddContactRequest
     * @classdesc Represents an AddContactRequest.
     * @constructor
     * @param {AddContactRequest.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function AddContactRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddContactRequest email.
     * @member {string} email
     * @memberof AddContactRequest
     * @instance
     */
    AddContactRequest.prototype.email = "";

    /**
     * Creates a new AddContactRequest instance using the specified properties.
     * @function create
     * @memberof AddContactRequest
     * @static
     * @param {AddContactRequest.$Properties=} [properties] Properties to set
     * @returns {AddContactRequest} AddContactRequest instance
     * @type {{
     *   (properties: AddContactRequest.$Shape): AddContactRequest & AddContactRequest.$Shape;
     *   (properties?: AddContactRequest.$Properties): AddContactRequest;
     * }}
     */
    AddContactRequest.create = function create(properties) {
        return new AddContactRequest(properties);
    };

    /**
     * Encodes the specified AddContactRequest message. Does not implicitly {@link AddContactRequest.verify|verify} messages.
     * @function encode
     * @memberof AddContactRequest
     * @static
     * @param {AddContactRequest.$Properties} message AddContactRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddContactRequest.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.email != null && Object.hasOwnProperty.call(message, "email"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified AddContactRequest message, length delimited. Does not implicitly {@link AddContactRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddContactRequest
     * @static
     * @param {AddContactRequest.$Properties} message AddContactRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddContactRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an AddContactRequest message from the specified reader or buffer.
     * @function decode
     * @memberof AddContactRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddContactRequest & AddContactRequest.$Shape} AddContactRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddContactRequest.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.AddContactRequest(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.email = value;
                    else
                        delete message.email;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes an AddContactRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddContactRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddContactRequest & AddContactRequest.$Shape} AddContactRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddContactRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddContactRequest message.
     * @function verify
     * @memberof AddContactRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddContactRequest.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.email != null && message.hasOwnProperty("email"))
            if (!$util.isString(message.email))
                return "email: string expected";
        return null;
    };

    /**
     * Creates an AddContactRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddContactRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddContactRequest} AddContactRequest
     */
    AddContactRequest.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.AddContactRequest)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".AddContactRequest: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.AddContactRequest();
        if (object.email != null)
            if (typeof object.email !== "string" || object.email.length)
                message.email = String(object.email);
        return message;
    };

    /**
     * Creates a plain object from an AddContactRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddContactRequest
     * @static
     * @param {AddContactRequest} message AddContactRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddContactRequest.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults)
            object.email = "";
        if (message.email != null && message.hasOwnProperty("email"))
            object.email = message.email;
        return object;
    };

    /**
     * Converts this AddContactRequest to JSON.
     * @function toJSON
     * @memberof AddContactRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddContactRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for AddContactRequest
     * @function getTypeUrl
     * @memberof AddContactRequest
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    AddContactRequest.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/AddContactRequest";
    };

    return AddContactRequest;
})();

export const AddContactResponse = $root.AddContactResponse = (() => {

    /**
     * Properties of an AddContactResponse.
     * @typedef {Object} AddContactResponse.$Properties
     * @property {boolean|null} [success] AddContactResponse success
     * @property {string|null} [message] AddContactResponse message
     * @property {number|Long|null} [userId] AddContactResponse userId
     * @property {string|null} [firstName] AddContactResponse firstName
     * @property {string|null} [lastName] AddContactResponse lastName
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of an AddContactResponse.
     * @exports IAddContactResponse
     * @interface IAddContactResponse
     * @augments AddContactResponse.$Properties
     * @deprecated Use AddContactResponse.$Properties instead.
     */

    /**
     * Shape of an AddContactResponse.
     * @typedef {AddContactResponse.$Properties} AddContactResponse.$Shape
     */

    /**
     * Constructs a new AddContactResponse.
     * @exports AddContactResponse
     * @classdesc Represents an AddContactResponse.
     * @constructor
     * @param {AddContactResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function AddContactResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddContactResponse success.
     * @member {boolean} success
     * @memberof AddContactResponse
     * @instance
     */
    AddContactResponse.prototype.success = false;

    /**
     * AddContactResponse message.
     * @member {string} message
     * @memberof AddContactResponse
     * @instance
     */
    AddContactResponse.prototype.message = "";

    /**
     * AddContactResponse userId.
     * @member {number|Long} userId
     * @memberof AddContactResponse
     * @instance
     */
    AddContactResponse.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * AddContactResponse firstName.
     * @member {string} firstName
     * @memberof AddContactResponse
     * @instance
     */
    AddContactResponse.prototype.firstName = "";

    /**
     * AddContactResponse lastName.
     * @member {string} lastName
     * @memberof AddContactResponse
     * @instance
     */
    AddContactResponse.prototype.lastName = "";

    /**
     * Creates a new AddContactResponse instance using the specified properties.
     * @function create
     * @memberof AddContactResponse
     * @static
     * @param {AddContactResponse.$Properties=} [properties] Properties to set
     * @returns {AddContactResponse} AddContactResponse instance
     * @type {{
     *   (properties: AddContactResponse.$Shape): AddContactResponse & AddContactResponse.$Shape;
     *   (properties?: AddContactResponse.$Properties): AddContactResponse;
     * }}
     */
    AddContactResponse.create = function create(properties) {
        return new AddContactResponse(properties);
    };

    /**
     * Encodes the specified AddContactResponse message. Does not implicitly {@link AddContactResponse.verify|verify} messages.
     * @function encode
     * @memberof AddContactResponse
     * @static
     * @param {AddContactResponse.$Properties} message AddContactResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddContactResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.userId);
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.firstName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.lastName);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified AddContactResponse message, length delimited. Does not implicitly {@link AddContactResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddContactResponse
     * @static
     * @param {AddContactResponse.$Properties} message AddContactResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddContactResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an AddContactResponse message from the specified reader or buffer.
     * @function decode
     * @memberof AddContactResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddContactResponse & AddContactResponse.$Shape} AddContactResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddContactResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.AddContactResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            case 3: {
                    if (wireType !== 0)
                        break;
                    if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                        message.userId = value;
                    else
                        delete message.userId;
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.firstName = value;
                    else
                        delete message.firstName;
                    continue;
                }
            case 5: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.lastName = value;
                    else
                        delete message.lastName;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes an AddContactResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddContactResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddContactResponse & AddContactResponse.$Shape} AddContactResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddContactResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddContactResponse message.
     * @function verify
     * @memberof AddContactResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddContactResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                return "userId: integer|Long expected";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        return null;
    };

    /**
     * Creates an AddContactResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddContactResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddContactResponse} AddContactResponse
     */
    AddContactResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.AddContactResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".AddContactResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.AddContactResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        if (object.userId != null)
            if (typeof object.userId === "object" ? object.userId.low || object.userId.high : Number(object.userId) !== 0)
                if ($util.Long)
                    message.userId = $util.Long.fromValue(object.userId, true);
                else if (typeof object.userId === "string")
                    message.userId = parseInt(object.userId, 10);
                else if (typeof object.userId === "number")
                    message.userId = object.userId;
                else if (typeof object.userId === "object")
                    message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber(true);
        if (object.firstName != null)
            if (typeof object.firstName !== "string" || object.firstName.length)
                message.firstName = String(object.firstName);
        if (object.lastName != null)
            if (typeof object.lastName !== "string" || object.lastName.length)
                message.lastName = String(object.lastName);
        return message;
    };

    /**
     * Creates a plain object from an AddContactResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddContactResponse
     * @static
     * @param {AddContactResponse} message AddContactResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddContactResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
            } else
                object.userId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            object.firstName = "";
            object.lastName = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (typeof BigInt !== "undefined" && options.longs === BigInt)
                object.userId = typeof message.userId === "number" ? BigInt(message.userId) : $util.Long.fromBits(message.userId.low >>> 0, message.userId.high >>> 0, true).toBigInt();
            else if (typeof message.userId === "number")
                object.userId = options.longs === String ? String(message.userId) : message.userId;
            else
                object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber(true) : message.userId;
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        return object;
    };

    /**
     * Converts this AddContactResponse to JSON.
     * @function toJSON
     * @memberof AddContactResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddContactResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for AddContactResponse
     * @function getTypeUrl
     * @memberof AddContactResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    AddContactResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/AddContactResponse";
    };

    return AddContactResponse;
})();

export const UpdateProfileRequest = $root.UpdateProfileRequest = (() => {

    /**
     * Properties of an UpdateProfileRequest.
     * @typedef {Object} UpdateProfileRequest.$Properties
     * @property {string|null} [firstName] UpdateProfileRequest firstName
     * @property {string|null} [lastName] UpdateProfileRequest lastName
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of an UpdateProfileRequest.
     * @exports IUpdateProfileRequest
     * @interface IUpdateProfileRequest
     * @augments UpdateProfileRequest.$Properties
     * @deprecated Use UpdateProfileRequest.$Properties instead.
     */

    /**
     * Shape of an UpdateProfileRequest.
     * @typedef {UpdateProfileRequest.$Properties} UpdateProfileRequest.$Shape
     */

    /**
     * Constructs a new UpdateProfileRequest.
     * @exports UpdateProfileRequest
     * @classdesc Represents an UpdateProfileRequest.
     * @constructor
     * @param {UpdateProfileRequest.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function UpdateProfileRequest(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateProfileRequest firstName.
     * @member {string} firstName
     * @memberof UpdateProfileRequest
     * @instance
     */
    UpdateProfileRequest.prototype.firstName = "";

    /**
     * UpdateProfileRequest lastName.
     * @member {string} lastName
     * @memberof UpdateProfileRequest
     * @instance
     */
    UpdateProfileRequest.prototype.lastName = "";

    /**
     * Creates a new UpdateProfileRequest instance using the specified properties.
     * @function create
     * @memberof UpdateProfileRequest
     * @static
     * @param {UpdateProfileRequest.$Properties=} [properties] Properties to set
     * @returns {UpdateProfileRequest} UpdateProfileRequest instance
     * @type {{
     *   (properties: UpdateProfileRequest.$Shape): UpdateProfileRequest & UpdateProfileRequest.$Shape;
     *   (properties?: UpdateProfileRequest.$Properties): UpdateProfileRequest;
     * }}
     */
    UpdateProfileRequest.create = function create(properties) {
        return new UpdateProfileRequest(properties);
    };

    /**
     * Encodes the specified UpdateProfileRequest message. Does not implicitly {@link UpdateProfileRequest.verify|verify} messages.
     * @function encode
     * @memberof UpdateProfileRequest
     * @static
     * @param {UpdateProfileRequest.$Properties} message UpdateProfileRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateProfileRequest.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.firstName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.lastName);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified UpdateProfileRequest message, length delimited. Does not implicitly {@link UpdateProfileRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateProfileRequest
     * @static
     * @param {UpdateProfileRequest.$Properties} message UpdateProfileRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateProfileRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an UpdateProfileRequest message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateProfileRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateProfileRequest & UpdateProfileRequest.$Shape} UpdateProfileRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateProfileRequest.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.UpdateProfileRequest(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.firstName = value;
                    else
                        delete message.firstName;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.lastName = value;
                    else
                        delete message.lastName;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes an UpdateProfileRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateProfileRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateProfileRequest & UpdateProfileRequest.$Shape} UpdateProfileRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateProfileRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateProfileRequest message.
     * @function verify
     * @memberof UpdateProfileRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateProfileRequest.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        return null;
    };

    /**
     * Creates an UpdateProfileRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateProfileRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateProfileRequest} UpdateProfileRequest
     */
    UpdateProfileRequest.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.UpdateProfileRequest)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".UpdateProfileRequest: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.UpdateProfileRequest();
        if (object.firstName != null)
            if (typeof object.firstName !== "string" || object.firstName.length)
                message.firstName = String(object.firstName);
        if (object.lastName != null)
            if (typeof object.lastName !== "string" || object.lastName.length)
                message.lastName = String(object.lastName);
        return message;
    };

    /**
     * Creates a plain object from an UpdateProfileRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateProfileRequest
     * @static
     * @param {UpdateProfileRequest} message UpdateProfileRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateProfileRequest.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.firstName = "";
            object.lastName = "";
        }
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        return object;
    };

    /**
     * Converts this UpdateProfileRequest to JSON.
     * @function toJSON
     * @memberof UpdateProfileRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateProfileRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for UpdateProfileRequest
     * @function getTypeUrl
     * @memberof UpdateProfileRequest
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    UpdateProfileRequest.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/UpdateProfileRequest";
    };

    return UpdateProfileRequest;
})();

export const UpdateProfileResponse = $root.UpdateProfileResponse = (() => {

    /**
     * Properties of an UpdateProfileResponse.
     * @typedef {Object} UpdateProfileResponse.$Properties
     * @property {boolean|null} [success] UpdateProfileResponse success
     * @property {string|null} [message] UpdateProfileResponse message
     * @property {string|null} [firstName] UpdateProfileResponse firstName
     * @property {string|null} [lastName] UpdateProfileResponse lastName
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Properties of an UpdateProfileResponse.
     * @exports IUpdateProfileResponse
     * @interface IUpdateProfileResponse
     * @augments UpdateProfileResponse.$Properties
     * @deprecated Use UpdateProfileResponse.$Properties instead.
     */

    /**
     * Shape of an UpdateProfileResponse.
     * @typedef {UpdateProfileResponse.$Properties} UpdateProfileResponse.$Shape
     */

    /**
     * Constructs a new UpdateProfileResponse.
     * @exports UpdateProfileResponse
     * @classdesc Represents an UpdateProfileResponse.
     * @constructor
     * @param {UpdateProfileResponse.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function UpdateProfileResponse(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdateProfileResponse success.
     * @member {boolean} success
     * @memberof UpdateProfileResponse
     * @instance
     */
    UpdateProfileResponse.prototype.success = false;

    /**
     * UpdateProfileResponse message.
     * @member {string} message
     * @memberof UpdateProfileResponse
     * @instance
     */
    UpdateProfileResponse.prototype.message = "";

    /**
     * UpdateProfileResponse firstName.
     * @member {string} firstName
     * @memberof UpdateProfileResponse
     * @instance
     */
    UpdateProfileResponse.prototype.firstName = "";

    /**
     * UpdateProfileResponse lastName.
     * @member {string} lastName
     * @memberof UpdateProfileResponse
     * @instance
     */
    UpdateProfileResponse.prototype.lastName = "";

    /**
     * Creates a new UpdateProfileResponse instance using the specified properties.
     * @function create
     * @memberof UpdateProfileResponse
     * @static
     * @param {UpdateProfileResponse.$Properties=} [properties] Properties to set
     * @returns {UpdateProfileResponse} UpdateProfileResponse instance
     * @type {{
     *   (properties: UpdateProfileResponse.$Shape): UpdateProfileResponse & UpdateProfileResponse.$Shape;
     *   (properties?: UpdateProfileResponse.$Properties): UpdateProfileResponse;
     * }}
     */
    UpdateProfileResponse.create = function create(properties) {
        return new UpdateProfileResponse(properties);
    };

    /**
     * Encodes the specified UpdateProfileResponse message. Does not implicitly {@link UpdateProfileResponse.verify|verify} messages.
     * @function encode
     * @memberof UpdateProfileResponse
     * @static
     * @param {UpdateProfileResponse.$Properties} message UpdateProfileResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateProfileResponse.encode = function encode(message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        if (message.success != null && Object.hasOwnProperty.call(message, "success"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
        if (message.message != null && Object.hasOwnProperty.call(message, "message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.firstName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.lastName);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified UpdateProfileResponse message, length delimited. Does not implicitly {@link UpdateProfileResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdateProfileResponse
     * @static
     * @param {UpdateProfileResponse.$Properties} message UpdateProfileResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdateProfileResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
    };

    /**
     * Decodes an UpdateProfileResponse message from the specified reader or buffer.
     * @function decode
     * @memberof UpdateProfileResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdateProfileResponse & UpdateProfileResponse.$Shape} UpdateProfileResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateProfileResponse.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.UpdateProfileResponse(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 0)
                        break;
                    if (value = reader.bool())
                        message.success = value;
                    else
                        delete message.success;
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.message = value;
                    else
                        delete message.message;
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.firstName = value;
                    else
                        delete message.firstName;
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.lastName = value;
                    else
                        delete message.lastName;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes an UpdateProfileResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdateProfileResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdateProfileResponse & UpdateProfileResponse.$Shape} UpdateProfileResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdateProfileResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdateProfileResponse message.
     * @function verify
     * @memberof UpdateProfileResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdateProfileResponse.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.success != null && message.hasOwnProperty("success"))
            if (typeof message.success !== "boolean")
                return "success: boolean expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        return null;
    };

    /**
     * Creates an UpdateProfileResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdateProfileResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdateProfileResponse} UpdateProfileResponse
     */
    UpdateProfileResponse.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.UpdateProfileResponse)
            return object;
        if (!$util.isObject(object))
            throw TypeError(".UpdateProfileResponse: object expected");
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.UpdateProfileResponse();
        if (object.success != null)
            if (object.success)
                message.success = Boolean(object.success);
        if (object.message != null)
            if (typeof object.message !== "string" || object.message.length)
                message.message = String(object.message);
        if (object.firstName != null)
            if (typeof object.firstName !== "string" || object.firstName.length)
                message.firstName = String(object.firstName);
        if (object.lastName != null)
            if (typeof object.lastName !== "string" || object.lastName.length)
                message.lastName = String(object.lastName);
        return message;
    };

    /**
     * Creates a plain object from an UpdateProfileResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdateProfileResponse
     * @static
     * @param {UpdateProfileResponse} message UpdateProfileResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpdateProfileResponse.toObject = function toObject(message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let object = {};
        if (options.defaults) {
            object.success = false;
            object.message = "";
            object.firstName = "";
            object.lastName = "";
        }
        if (message.success != null && message.hasOwnProperty("success"))
            object.success = message.success;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        return object;
    };

    /**
     * Converts this UpdateProfileResponse to JSON.
     * @function toJSON
     * @memberof UpdateProfileResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdateProfileResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for UpdateProfileResponse
     * @function getTypeUrl
     * @memberof UpdateProfileResponse
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    UpdateProfileResponse.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/UpdateProfileResponse";
    };

    return UpdateProfileResponse;
})();

export {
  $root as default
};

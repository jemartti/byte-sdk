/* jshint -W078 */

var assert = require('assert');
var typeCheck = require('type-check').typeCheck;
var _s = require('underscore.string');


class ComputerConfig {
    constructor(name, placeholder) {
        assert(name, placeholder);
        this.data = {
            'args': [{
                'name': name,
                'type': 'String',
                'placeholder': placeholder
            }]
        };
    }
}

class ComputerResponse {
    constructor() {
        this.data = {
            'objects': []
        };
    }

    addObject(object) {
        assert(object);
        this.data.objects.push(object);
    }
}

class ComputerObject {
    constructor(type, data) {
        assert(typeCheck('String', type));
        assert(
            [
                'paragraph',
                'text',
                'link',
                'image',
                'graphic',
                'gif',
                'video',
                'music'
            ].indexOf(type) >= 0
        );
        this.type = type;

        assert(typeCheck('Object', data));

        if (data.frame) {
            assert(typeCheck('(Number, Number, Number, Number)', data.frame));
            this.frame = data.frame;
        }

        if (data.name) {
            assert(typeCheck('String', data.name));
            this.name = data.name;
        }

        if (data.transform) {
            assert(typeCheck(
                '((Number, Number), (Number, Number), (Number, Number))',
                data.transform
            ));
            this.transform = data.transform;
        }

        if (data.opacity) {
            assert(typeCheck('Number', data.opacity));
            assert(data.opacity >= 0 && data.opacity <= 1);
            this.opacity = data.opacity;
        }

        if (data.effects) {
            assert(typeCheck('[String]', data.effects));
            for (var i = 0; i < data.effects.length; ++i) {
                assert(
                    [
                        'sin',
                        'cos',
                        'wave',
                        'rotate',
                        'soon',
                        'fireworks'
                    ].indexOf(data.effects[i]) >= 0
                );
            }
            this.effects = data.effects;
        } else {
            this.effects = [];
        }

        if (data.originalSrc) {
            assert(typeCheck('String', data.originalSrc));
            this.originalSrc = data.originalSrc;
        }
    }
}

class ParagraphObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{text: String, ...}', data));

        super('paragraph', data);

        assert(_s.trim(data.text).length > 0);
        this.text = data.text;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(['sans', 'serif'].indexOf(data.style) >= 0);
            this.style = data.style;
        }

        if (data.size) {
            assert(typeCheck('Number', data.size));
            assert(data.size > 0);
            this.size = data.size;
        }

        if (data.alignment) {
            assert(typeCheck('String', data.alignment));
            assert(['left', 'center', 'right'].indexOf(data.alignment) >= 0);
            this.alignment = data.alignment;
        }

        if (data.attributes) {
            assert(typeCheck('[Object]', data.attributes));
            for (var j = 0; j < data.attributes.length; ++j) {
                assert(
                    typeCheck(
                        '{type: String, range: (Number, Number)}',
                        data.attributes[j]
                    )
                );
                assert(
                    [
                        'bold',
                        'italic',
                        'bold-italic'
                    ].indexOf(data.attributes[j].type) >= 0
                );
            }
            this.attributes = data.attributes;
        }
    }
}

class TextObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{text: String, ...}', data));

        super('text', data);

        assert(_s.trim(data.text).length > 0);
        this.text = data.text;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(
                [
                    'sans',
                    'mono',
                    'punchout',
                    'eightbit',
                    'cursive',
                    'poster',
                    'tape',
                    'book',
                    'serif'
                ].indexOf(data.style) >= 0
            );
            this.style = data.style;
        }

        if (data['word-wrap']) {
            assert(typeCheck('String', data['word-wrap']));
            assert(['auto', 'manual'].indexOf(data['word-wrap']) >= 0);
            this['word-wrap'] = data['word-wrap'];
        }

        if (data.padding) {
            assert(typeCheck('Number', data.padding));
            assert(data.padding >= 0);
            this.padding = data.padding;
        }
    }
}

class LinkObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{url: String, ...}', data));

        super('link', data);

        this.url = data.url;

        if (data.title) {
            assert(typeCheck('String', data.title));
            this.title = data.title;
        }

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }

        if (data.style) {
            assert(typeCheck('String', data.style));
            assert(['sans', 'serif'].indexOf(data.style) >= 0);
            this.style = data.style;
        }

        if (data.description) {
            assert(typeCheck('String', data.description));
            this.description = data.description;
        }
    }
}

class ImageObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{src: String, ...}', data));

        super('image', data);

        this.src = data.src;

        if (data.scaleMode) {
            assert(typeCheck('String', data.scaleMode));
            assert(['fit', 'fill'].indexOf(data.scaleMode) >= 0);
            this.scaleMode = data.scaleMode;
        } else {
            this.scaleMode = 'fill';
        }
    }
}

class GraphicObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{src: String, ...}', data));

        super('graphic', data);

        this.src = data.src;

        if (data.color) {
            assert(typeCheck('(Number, Number, Number, Number)', data.color));
            for (var i = 0; i < 4; ++i) {
                assert(data.color[i] >= 0 && data.color[i] <= 1);
            }
            this.color = data.color;
        }
    }
}

class GifObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{src: String, ...}', data));

        super('gif', data);

        this.src = data.src;

        if (data.scaleMode) {
            assert(typeCheck('String', data.scaleMode));
            assert(['fit', 'fill'].indexOf(data.scaleMode) >= 0);
            this.scaleMode = data.scaleMode;
        } else {
            this.scaleMode = 'fit';
        }
    }
}

class VideoObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck('{src: String, ...}', data));

        super('video', data);

        this.src = data.src;

        if (data.muted) {
            assert(typeCheck('Boolean', data.muted));
            this.muted = data.muted;
        }
    }
}

class MusicObject extends ComputerObject {
    constructor(data) {
        assert(typeCheck(
            '{bpm: Number, length: Number, instructions: Array}', data
        ));

        super('music', data);

        assert(data.bpm > 0);
        this.bpm = data.bpm;

        assert(
            (data.length >= 2) && (data.length <= 16) && (data.length % 2 === 0)
        );
        this.length = data.length;

        // Beats
        assert(data.instructions.length === (data.length * 4));
        for (var i = 0; i < data.instructions.length; ++i) {
            var beat = data.instructions[i];
            assert(typeCheck('Array', beat));

            // Hits
            var re = new RegExp('^[A-G]{1}#?/{1}(-1|[0-8]){1}$');
            for (var j = 0; j < data.instructions[i].length; ++j) {
                var hit = beat[j];
                assert(typeCheck(
                    '{time: Number, type: Number, bank: String, note: String, velo: Number, duration: Number}',
                    hit
                ));

                assert(hit.time >= 0);

                assert(hit.type === 0 || hit.type === 1);

                if (hit.type === 0) {
                    assert([
                        'bleep',
                        'meow',
                        'bass',
                        'ping',
                        'string',
                        'reso',
                        'arp',
                        'bark',
                        'mono1',
                        'mono2',
                        'mono3',
                        'funk',
                        'sax',
                        'bell',
                        'roboto',
                        'do'
                    ].indexOf(hit.bank) >= 0);

                    assert(re.test(hit.note));
                } else if (hit.type === 1) {
                    assert(hit.bank === 'drums');

                    assert([
                        'Kick',
                        'Snare',
                        'Clap',
                        'Hat',
                        'Thump',
                        'Glitch',
                        'Tambourine',
                        'Whistle',
                        'Block',
                        'Stick',
                        'Shaker',
                        'Crash',
                        'Tom',
                        'Conga',
                        'Cowbell',
                        'Yeah'
                    ].indexOf(hit.note) >= 0);
                }

                assert(hit.velo >= 0 && hit.velo <= 127);

                assert(hit.duration > 0);
            }
        }
        this.instructions = data.instructions;
    }
}


module.exports = {
    ComputerConfig: ComputerConfig,
    ComputerResponse: ComputerResponse,
    ParagraphObject: ParagraphObject,
    TextObject: TextObject,
    LinkObject: LinkObject,
    ImageObject: ImageObject,
    GraphicObject: GraphicObject,
    GifObject: GifObject,
    VideoObject: VideoObject,
    MusicObject: MusicObject
};

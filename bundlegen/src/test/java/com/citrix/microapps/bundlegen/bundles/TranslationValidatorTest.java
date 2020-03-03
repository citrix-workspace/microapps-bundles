package com.citrix.microapps.bundlegen.bundles;

import java.util.Collections;

import org.junit.jupiter.api.Test;

import com.citrix.microapps.bundlegen.pojo.ModelTranslation;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TranslationValidatorTest {

    @Test
    void validTranslationFile() {
        final String translationChecksum = "C542C2EB82422FF09EA88ADD64F91283";

        ModelTranslation translationModel = new ModelTranslation(
                Collections.singletonMap("1", Collections.singletonMap("key1", "value1")));

        assertEquals(translationChecksum, new TranslationValidator(translationModel).checksum().get());
    }
}
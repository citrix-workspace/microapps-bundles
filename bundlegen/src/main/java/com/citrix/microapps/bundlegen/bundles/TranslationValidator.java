package com.citrix.microapps.bundlegen.bundles;

import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.codec.digest.DigestUtils;

import com.citrix.microapps.bundlegen.pojo.ModelTranslation;

import static java.lang.String.format;

public class TranslationValidator {

    private static final String TRANSLATION_CHECKSUM_PAD = "Citrix";

    private ModelTranslation modelTranslation;

    public TranslationValidator(ModelTranslation modelTranslation) {
        this.modelTranslation = modelTranslation;
    }

    // Sonar: Hashing data is security-sensitive.
    // MD5 is used only to create a checksum of keys in translation files
    @SuppressWarnings("squid:S4790")
    public Optional<String> checksum() {
        StringBuilder builder = new StringBuilder();
        if (modelTranslation.getAppTranslations().isEmpty()) {
            return Optional.empty();
        }

        modelTranslation.getAppTranslations()
                .entrySet()
                .stream()
                .map(entry ->
                        DigestUtils.md5Hex(format("%s-%s", entry.getKey(),
                                entry.getValue()
                                        .keySet()
                                        .stream()
                                        .sorted()
                                        .collect(Collectors.joining(",")))))
                .sorted()
                .forEach(builder::append);

        builder.append(TRANSLATION_CHECKSUM_PAD);
        return Optional.of(DigestUtils
                .md5Hex(builder.toString())
                .toUpperCase());
    }
}

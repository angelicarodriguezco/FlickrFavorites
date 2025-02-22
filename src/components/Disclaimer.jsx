import React, { useState, useEffect } from "react";

const disclaimer = () => {
    return (
        <div class="disclaimer">
    <h2>Disclaimer</h2>
    <p>This application is built as part of a coding challenge and uses the Flickr API to fetch and display images. Please be aware that the content retrieved from Flickr is not curated or controlled by this application.</p>
    
    <p>Flickr is a public image-sharing platform where users upload their own content, which may include inappropriate or explicit material. This application has enabled Flickr’s <strong>SafeSearch filtering</strong> to minimize the risk of displaying such content. However, no filtering system is completely foolproof.</p>
    
    <p>I do not have control over the images provided by Flickr, nor do I assume responsibility for any inappropriate, explicit, or offensive content that may appear. If additional filtering or moderation is required, it should be handled at the Flickr API level or within Flickr account settings.</p>
    
    <p>By using this application, you acknowledge that image content is sourced externally and that any concerns regarding inappropriate material should be directed to Flickr’s reporting mechanisms.</p>
</div>
    );
};

export default disclaimer;
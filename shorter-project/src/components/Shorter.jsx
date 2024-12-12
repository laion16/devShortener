import { useEffect, useState } from "react";
import "./Shorter.css"
import ClipboardJS from "clipboard";

function Shorter() {
    const [inputURL, setInputURL] = useState('')
    const [shortURL, setShortURL] = useState('')
    const [copied, setCopied] = useState(false)

    // API Alternative => "https://api-ssl.bitly.com/v4/shorten"
    const apiService = "https://api.tinyurl.com/create/"
    let clipboard;

    const handleInputChange = (event) => {
        setInputURL(event.target.value);
        setShortURL('')
    };

    const functionClipped = () => {
        clipboard = new ClipboardJS('.btn');

        clipboard.on('error', function (e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });

        clipboard.on('success', function (e) {
            //console.info('Action:', e.action);
            //console.info('Text:', e.text);
            //console.info('Trigger:', e.trigger);

            setCopied(true); // Show modal
            e.clearSelection();

            // Hide the modal after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        });

        return () => {
            clipboard.destroy();
        };
    }

    useEffect(() => {
        functionClipped()
    }, []);

    const readService = (url) => {
        const apiToken = import.meta.env.VITE_API_TINY_TOKEN
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${apiToken}`);
        myHeaders.append('Content-Type', 'application/json')

        var body = JSON.stringify({
            domain: 'tinyurl.com', // API Alternative: attribute value => 'bit.ly'
            url: inputURL // API Alternative: attribute name => long_url
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
        };

        console.log(requestOptions);

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log(result.data.tiny_url)
                setShortURL(result.data.tiny_url || "Error generating short URL") //API Alternative => result.link
            })
            .catch(error => console.log('error', error));

    }

    return (
        <section className="padded">
            <div className="container">
                <h1>URL SHORTENER</h1>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Ingresa la URL aquí"
                        value={inputURL}
                        onChange={handleInputChange}
                        className="form-control inputStyle"
                    />
                    <button className="btn btn-secondary buttonStyle"
                        onClick={() => readService(apiService)}>Shorten URL</button>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Aquí se generará la URL acortada"
                        value={shortURL}
                        className="form-control inputStyle showStyle"
                        id="shortURL"
                        readOnly
                    />
                    <button className="btn btn-secondary buttonStyle"
                        data-clipboard-target="#shortURL">Copy URL</button>
                </div>

            </div>
            {copied && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>¡URL copied to clipboard!</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Shorter